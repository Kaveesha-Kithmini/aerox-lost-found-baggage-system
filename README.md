<div align="center">

# 🛫 **AeroX Lost & Found Baggage Handling System**

### AI-Powered Lost & Found Luggage Management System
Seamlessly manage **lost luggage reports**, **found items**, and **automated matching** — powered by **React**, **Node.js**, **MongoDB**, and **Twilio**.

---

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

</div>

---

## 📋 **Overview**

**AeroX Lost & Found Baggage Handling System** is an intelligent platform designed for airports to manage lost and found luggage efficiently.

It helps airports and passengers:
- 📝 **Report lost luggage** with detailed descriptions
- 🔍 **Register found items** by airport staff
- 🔗 **Automatically match** lost and found items
- 📱 **Send notifications** via SMS and WhatsApp
- 📊 **Track status** in real-time through admin dashboard
- 📄 **Generate reports** and QR codes for easy identification

All accessible through a modern **React dashboard** and a robust **Express.js backend**.

---

## 🎯 **Core Modules**

| Module | Description |
|:-------|:------------|
| **Lost Luggage Reporter** | Allows passengers to submit detailed lost luggage reports with images and descriptions |
| **Found Item Registrar** | Enables airport staff to register found luggage items with matching criteria |
| **Intelligent Matcher** | Automatically matches lost and found items based on characteristics (color, size, brand, etc.) |
| **Notification System** | Sends real-time SMS and WhatsApp notifications to passengers using Twilio |
| **Admin Dashboard** | Provides comprehensive view of all reports with status tracking and management |
| **QR Code System** | Generates and scans QR codes for quick luggage identification and tracking |

---

## ✨ **Key Features**

- 📝 AI-driven **Luggage Categorization & Matching**
- 🔔 Smart **Real-time Notifications** (SMS & WhatsApp)
- 📊 Comprehensive **Admin Dashboard** with analytics
- 📱 **QR Code Generation** and scanning for quick tracking
- 🖼️ **Image Upload Support** for luggage identification
- 📄 **PDF Report Generation** for documentation
- 🌍 **International Phone Support** with country codes
- 🔒 Secure **Authentication System**
- 📧 **Email Integration** for QR code delivery
- 🎨 Beautiful **Shadcn UI** components
- ⚡ **Fast Performance** with Vite

---

## 🏗️ **Architecture**

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18.2 + TypeScript + Vite |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas + Mongoose |
| **Styling** | Tailwind CSS + Shadcn UI |
| **Notifications** | Twilio (SMS & WhatsApp) |
| **File Upload** | Multer |
| **PDF Generation** | jsPDF |
| **QR Codes** | qrcode.react |

---

## 📋 **Prerequisites**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Build for Production](#build-for-production)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- 📝 **Lost Luggage Reporting** - Passengers can report lost luggage with detailed information
- 🔍 **Found Luggage Registration** - Airport staff can register found luggage items
- 🔄 **Real-time Status Tracking** - Track luggage status (Pending, Matched, Resolved)
- 🔗 **Intelligent Matching System** - Automatically match lost and found items based on characteristics

### Advanced Features
- 📱 **QR Code Generation & Scanning** - Generate QR codes for luggage tracking
- 📲 **Automated Notifications** - SMS and WhatsApp notifications via Twilio integration
- 📊 **Admin Dashboard** - Comprehensive dashboard for managing all reports
- 📄 **PDF Report Generation** - Export reports to PDF using jsPDF
- 🖼️ **Image Upload Support** - Upload luggage and QR code images
- 🌍 **International Phone Support** - Country code selection for phone numbers
- 🔒 **Secure Authentication** - Admin login system
- 📧 **Email Integration** - Send QR codes via email using Nodemailer

### User Experience
- 🎨 **Modern UI** - Built with Shadcn UI and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Optimized with Vite and React
- 🔔 **Toast Notifications** - User-friendly notifications with Sonner

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.2 with TypeScript
- **Build Tool:** Vite 5.4
- **Styling:** Tailwind CSS 3.4, Shadcn UI
- **UI Components:** Radix UI primitives
- **Form Management:** React Hook Form + Zod validation
- **HTTP Client:** Axios
- **Routing:** React Router DOM 6.26
- **QR Code:** qrcode.react, react-qr-scanner
- **PDF Generation:** jsPDF, jsPDF-AutoTable
- **State Management:** TanStack Query (React Query)
- **Notifications:** Sonner (Toast notifications)
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.21
- **Database:** MongoDB with Mongoose 7.8
- **File Upload:** Multer 1.4.5
- **SMS/WhatsApp:** Twilio 5.5
- **Email:** Nodemailer 6.10
- **Environment Variables:** dotenv 16.6
- **CORS:** cors 2.8
- **Dev Tool:** Nodemon 3.1

### Database
- **Database:** MongoDB Atlas
- **ODM:** Mongoose

## 📁 Project Structure

```
lostfound-aero-connect-main/
├── Backend/
│   ├── Controllers/
│   │   ├── FoundControllers.js    # Found luggage business logic
│   │   └── LostControllers.js     # Lost luggage business logic
│   ├── Model/
│   │   ├── FoundModel.js          # Found luggage schema
│   │   └── LostModel.js           # Lost luggage schema
│   ├── Routes/
│   │   ├── FoundRoutes.js         # Found luggage API routes
│   │   └── LostRoutes.js          # Lost luggage API routes
│   ├── utils/
│   │   ├── sendSms.js             # SMS notification utility
│   │   └── sendWhatsapp.js        # WhatsApp notification utility
│   ├── uploads/                   # Uploaded images storage
│   ├── app.js                     # Express server entry point
│   ├── package.json
│   └── .env                       # Environment variables (create this)
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── PageLayout.tsx
│   │   │   ├── ui/                # Shadcn UI components
│   │   │   ├── QrCodeGenerator.tsx
│   │   │   └── UpdateLuggageModal.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LostLuggageForm.tsx
│   │   │   ├── FoundLuggageForm.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── QrCodeGeneratorPage.tsx
│   │   │   ├── QrScannerPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── NotFound.tsx
│   │   ├── services/
│   │   │   └── api.ts             # API service layer
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript type definitions
│   │   ├── hooks/
│   │   │   ├── use-toast.ts
│   │   │   └── use-mobile.tsx
│   │   ├── lib/
│   │   │   └── utils.ts           # Utility functions
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── .gitignore
├── package.json
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Twilio Account** (for SMS/WhatsApp) - [Sign up](https://www.twilio.com/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Kaveesha-Kithmini/aerox-lost-found-baggage-system.git
cd aerox-lost-found-baggage-system
```

### 2. Install Dependencies

#### Install Root Dependencies
```bash
npm install
```

#### Install Backend Dependencies
```bash
cd Backend
npm install
cd ..
```

#### Install Frontend Dependencies
```bash
cd Frontend
npm install
cd ..
```

## ⚙️ Configuration

### 1. Backend Environment Variables

Create a `.env` file in the `Backend` folder:

```bash
cd Backend
# Create .env file (use your text editor or command below)
```

#### For Windows PowerShell:
```powershell
New-Item -Path "Backend\.env" -ItemType File
```

#### For Mac/Linux:
```bash
touch Backend/.env
```

Add the following variables to `Backend/.env`:

```env
# Twilio Configuration (Required for SMS/WhatsApp)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# MongoDB Configuration (Optional - already configured in code)
MONGODB_URI=mongodb+srv://your_connection_string

# Server Configuration
PORT=3001
```

### 2. Get Twilio Credentials

1. Sign up at [Twilio](https://www.twilio.com/)
2. Go to Console Dashboard
3. Find your **Account SID** and **Auth Token**
4. Get a Twilio phone number for SMS/WhatsApp
5. Add these credentials to your `.env` file

**Example:**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### 3. MongoDB Configuration (Optional)

The application is already configured with a MongoDB connection string. If you want to use your own MongoDB database:

1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Add it to the `.env` file as `MONGODB_URI`

### 4. Frontend Configuration

The frontend is configured to connect to `http://localhost:3001` by default. If you need to change the backend URL, edit:

**`Frontend/src/services/api.ts`:**
```typescript
const API_BASE_URL = 'http://localhost:3001';
```

## 🎯 Running the Application

### Method 1: Run Backend and Frontend Separately (Recommended)

#### Terminal 1 - Start Backend Server
```bash
cd Backend
npm start
```
✅ The backend will run on `http://localhost:3001`

#### Terminal 2 - Start Frontend Development Server
```bash
cd Frontend
npm run dev
```
✅ The frontend will run on `http://localhost:5173`

### Method 2: Run Both Concurrently

From the root directory:

```bash
# Install concurrently globally (one-time setup)
npm install -g concurrently

# Run both servers
concurrently "cd Backend && npm start" "cd Frontend && npm run dev"
```

## 🌐 Accessing the Application

Once both servers are running:

- **Frontend:** Open your browser and go to `http://localhost:5173`
- **Backend API:** `http://localhost:3001`
- **Test Backend:** `http://localhost:3001/test`

### Application Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/lost-luggage` | Report lost luggage |
| `/found-luggage` | Register found luggage |
| `/admin-dashboard` | Admin dashboard (view all reports) |
| `/qr-generator` | Generate QR codes |
| `/qr-scanner` | Scan QR codes |
| `/about` | About page |
| `/contact` | Contact page |
| `/login` | Admin login |

## 📡 API Endpoints

### Lost Luggage Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/Losts` | Get all lost luggage reports |
| POST | `/Losts` | Create a new lost luggage report |
| GET | `/Losts/:id` | Get a specific lost luggage report |
| PUT | `/Losts/:id` | Update a lost luggage report |
| DELETE | `/Losts/:id` | Delete a lost luggage report |

### Found Luggage Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/Founds` | Get all found luggage reports |
| POST | `/Founds` | Create a new found luggage report |
| GET | `/Founds/:id` | Get a specific found luggage report |
| PUT | `/Founds/:id` | Update a found luggage report |
| DELETE | `/Founds/:id` | Delete a found luggage report |

### Other Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/test` | Test server connection |

### Example API Request

#### Create Lost Luggage Report
```bash
POST http://localhost:3001/Losts
Content-Type: application/json

{
  "passengerName": "John Doe",
  "contactNumber": "+1234567890",
  "email": "john@example.com",
  "flightNumber": "AX123",
  "dateOfTravel": "2025-11-26",
  "luggageType": "Suitcase",
  "color": "Black",
  "brand": "Samsonite",
  "size": "Large",
  "description": "Black suitcase with red ribbon",
  "status": "Pending"
}
```

## 🔐 Environment Variables Reference

### Backend `.env` File

```env
# ============================================
# Twilio Configuration (REQUIRED)
# ============================================
# Get these from: https://console.twilio.com/
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890

# ============================================
# MongoDB Configuration (OPTIONAL)
# ============================================
# Default connection is already configured
# Only add this if you want to use your own database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# ============================================
# Server Configuration (OPTIONAL)
# ============================================
PORT=3001
```

## 📦 Build for Production

### Build Frontend

```bash
cd Frontend
npm run build
```

This creates an optimized production build in the `Frontend/dist` folder.

### Run Frontend Preview (Production Build)

```bash
cd Frontend
npm run preview
```

### Deploy Backend

For production deployment:

1. Set environment variables on your hosting platform
2. Ensure MongoDB Atlas IP whitelist includes your server
3. Use a process manager like PM2:

```bash
npm install -g pm2
cd Backend
pm2 start app.js --name "aerox-backend"
```

## 🧪 Testing

### Test Backend Connection

**Using curl (Mac/Linux):**
```bash
curl http://localhost:3001/test
```

**Using PowerShell (Windows):**
```powershell
Invoke-WebRequest -Uri http://localhost:3001/test
```

**Using Browser:**
Simply open: `http://localhost:3001/test`

**Expected Response:**
```json
{
  "message": "Server is running!"
}
```

### Test Database Connection

The backend will log database connection status on startup:
```
Connected to MongoDB
Server is running on port 3001
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **Port 3001 already in use**

**Windows PowerShell:**
```powershell
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill process
lsof -ti:3001 | xargs kill -9
```

#### 2. **MongoDB Connection Failed**

**Solutions:**
- Check your internet connection
- Verify MongoDB Atlas credentials
- Ensure your IP is whitelisted in MongoDB Atlas Network Access
- Check if the connection string is correct

#### 3. **Twilio SMS/WhatsApp not working**

**Checklist:**
- ✅ Verify your Twilio credentials in `.env`
- ✅ Check Twilio account balance
- ✅ Ensure phone numbers are in E.164 format (`+1234567890`)
- ✅ For WhatsApp: Enable WhatsApp sandbox or activate WhatsApp Business
- ✅ Check Twilio console logs for error messages

#### 4. **File Upload Not Working**

**Solutions:**
- Ensure `Backend/uploads/` directory exists and has write permissions
- Check file size limits (default max: 5MB)
- Verify Content-Type is `multipart/form-data`

#### 5. **CORS Errors**

**Solutions:**
- Verify frontend URL is allowed in `Backend/app.js`
- Check that backend is running on port 3001
- Clear browser cache and restart both servers

#### 6. **Module Not Found Errors**

**Solution:**
```bash
# Delete node_modules and reinstall
cd Backend
rm -rf node_modules package-lock.json
npm install

cd ../Frontend
rm -rf node_modules package-lock.json
npm install
```

#### 7. **Environment Variables Not Loading**

**Solutions:**
- Ensure `.env` file is in the `Backend` folder
- Check that `dotenv` is installed: `npm install dotenv`
- Verify `.env` file format (no quotes needed for values)
- Restart the backend server after changing `.env`

#### 8. **Frontend Can't Connect to Backend**

**Solutions:**
- Ensure backend is running on `http://localhost:3001`
- Check `Frontend/src/services/api.ts` for correct API_BASE_URL
- Verify no firewall is blocking the connection
- Check browser console for specific error messages

## 📝 Additional Scripts

### Frontend Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint for code quality
```

### Backend Scripts

```bash
npm start            # Start server with nodemon (auto-restart on changes)
npm test             # Run tests (if configured)
```

## 🔒 Security Best Practices

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Rotate Twilio credentials** if accidentally exposed
3. **Use strong passwords** for MongoDB Atlas
4. **Enable MongoDB Atlas IP whitelist**
5. **Validate all user inputs** on both frontend and backend
6. **Sanitize file uploads** to prevent malicious files
7. **Use HTTPS** in production environments

## 🚀 Deployment

### Deploy to Vercel (Frontend)

```bash
cd Frontend
npm install -g vercel
vercel
```

### Deploy to Heroku (Backend)

```bash
cd Backend
heroku create aerox-backend
git push heroku main
```

### Deploy to Railway/Render

Both platforms support easy deployment from GitHub repositories. Connect your repository and set environment variables in their dashboard.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for frontend code
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Kaveesha Kithmini** - [@Kaveesha-Kithmini](https://github.com/Kaveesha-Kithmini)

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Twilio](https://www.twilio.com/) for SMS/WhatsApp integration
- [MongoDB](https://www.mongodb.com/) for the database solution
- [Vite](https://vitejs.dev/) for the fast build tool
- The open-source community

## 📞 Support

- 🐛 Issues: [GitHub Issues](https://github.com/Kaveesha-Kithmini/aerox-lost-found-baggage-system/issues)



**Made with ❤️ for AeroX Airlines**


