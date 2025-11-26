const Lost = require("../Model/LostModel");
const sendWhatsapp = require('../utils/sendWhatsapp');
const sendSms = require('../utils/sendSms');

//data display
const getAllLost = async (req, res, next) => {
    try {
        const losts = await Lost.find();
        return res.status(200).json(losts);
    } catch (err) {
        console.error("Error fetching lost items:", err);
        return res.status(500).json({ message: "Error fetching lost items", error: err.message });
    }
};

//data insert
const addLosts = async(req, res, next) => {
    try {
        console.log("Received form data:", req.body);
        console.log("Received files:", req.files);
        
        const {
            passengerName,
            passengerId,
            email,
            phone,
            whatsappNumber,
            airline,
            flightNumber,
            flightDate,
            flightTime,
            bagSize,
            bagColor,
            bagBrand,
            uniqueIdentifiers,
            dateOfLoss,
            lastSeenLocation
        } = req.body;

        // Handle file uploads
        let qrCodeImage = null;
        let bagImage = null;

        if (req.files) {
            if (req.files.qrCodeImage) {
                const qrCodeFile = req.files.qrCodeImage[0];
                qrCodeImage = qrCodeFile.filename; // Store only the filename
            }
            if (req.files.bagImage) {
                const bagFile = req.files.bagImage[0];
                bagImage = bagFile.filename; // Store only the filename
            }
        }

        // Validate required fields
        const requiredFields = ['passengerName', 'passengerId', 'email', 'phone', 'whatsappNumber', 'airline', 
            'flightNumber', 'flightDate', 'flightTime', 'bagSize', 'bagColor', 'bagBrand', 
            'uniqueIdentifiers', 'dateOfLoss', 'lastSeenLocation'];
        
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            console.error("Missing required fields:", missingFields);
            return res.status(400).json({ 
                message: "Missing required fields", 
                missingFields 
            });
        }

        const losts = new Lost({
            passengerName,
            passengerId,
            email,
            phone,
            whatsappNumber,
            airline,
            flightNumber,
            flightDate: new Date(flightDate),
            flightTime,
            bagSize,
            bagColor,
            bagBrand,
            uniqueIdentifiers,
            dateOfLoss: new Date(dateOfLoss),
            lastSeenLocation,
            qrCodeImage,
            bagImage,
            status: 'Pending'
        });
        
        console.log("Creating lost item:", losts);
        const savedLost = await losts.save();
        console.log("Successfully saved lost item:", savedLost);
        return res.status(201).json(savedLost);
    } catch(err) {
        console.error("Error adding lost item:", err);
        return res.status(500).json({ 
            message: "Unable to add Lost item", 
            error: err.message,
            stack: err.stack
        });
    }
};

//Get by ID
const getById = async(req, res, next) => {
    const id = req.params.id;
    try {
        const lost = await Lost.findById(id);
        if (!lost) {
            return res.status(404).json({ message: "Lost item not found" });
        }
        return res.status(200).json(lost);
    } catch(err) {
        console.error("Error fetching lost item by ID:", err);
        return res.status(500).json({ message: "Error fetching lost item", error: err.message });
    }
};

//Update lost details
const updateLost = async(req, res, next) => {
    const id = req.params.id;
    try {
        const updateData = { ...req.body };
        if (updateData.flightDate) {
            updateData.flightDate = new Date(updateData.flightDate);
        }

        const updatedLost = await Lost.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedLost) {
            return res.status(404).json({ message: "Lost item not found" });
        }

        // Send WhatsApp and SMS if status is updated to Matched
        if (updateData.status === 'Matched') {
            const contactInfo = `\n\nLost & Found Department\nEmail: lostandfound@aerox.com\nPhone: +1 (123) 456-7890`;
            const message = `Dear ${updatedLost.passengerName}, your lost luggage report (${updatedLost._id}) has been matched! Please contact the lost & found office for further instructions.${contactInfo}`;
            if (updatedLost.whatsappNumber) {
                try {
                    await sendWhatsapp(updatedLost.whatsappNumber, message);
                } catch (waError) {
                    console.error('Failed to send WhatsApp message:', waError);
                }
            }
            if (updatedLost.phone) {
                try {
                    await sendSms(updatedLost.phone, message);
                } catch (smsError) {
                    console.error('Failed to send SMS:', smsError);
                }
            }
        }

        return res.status(200).json(updatedLost);
    } catch(err) {
        console.error("Error updating lost item:", err);
        return res.status(500).json({ message: "Unable to update Lost Details", error: err.message });
    }
};

//delete lost details
const deleteLost = async(req, res, next) => {
    const id = req.params.id;

    try {
        const lost = await Lost.findByIdAndDelete(id);
        if (!lost) {
            return res.status(404).json({ message: "Lost item not found" });
        }
        return res.status(200).json(lost);
    } catch(err) {
        console.error("Error deleting lost item:", err);
        return res.status(500).json({ message: "Unable to delete Lost Details", error: err.message });
    }
};

module.exports = {
    getAllLost,
    addLosts,
    getById,
    updateLost,
    deleteLost
};
