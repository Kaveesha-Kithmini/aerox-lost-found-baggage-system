const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const router = require("./Routes/LostRoutes");
const foundRoutes = require("./Routes/FoundRoutes");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3001; // Changed to port 3001

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8081'], // Allow both ports
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route to verify server is running
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.use("/Losts", router);
app.use("/Founds", foundRoutes);

// Example in Express.js
app.get('/api/flightbooking_models/:id', async (req, res) => {
  try {
    const doc = await mongoose.connection.db.collection('flightbooking_models').findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/send-qr-email', async (req, res) => {
  const { email, qrImage } = req.body;
  if (!email || !qrImage) {
    return res.status(400).json({ error: 'Missing email or QR image' });
  }

  // Use environment variables for SMTP configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Remove the data URL prefix to get the base64 string
  const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Your Passenger QR Code',
    text: 'Attached is your QR code.',
    attachments: [
      {
        filename: 'qr-code.png',
        content: base64Data,
        encoding: 'base64'
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:IT23286696@airportmanagementsystem.8nzgv.mongodb.net/test");
        console.log("Connected to MongoDB");
        
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();