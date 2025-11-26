const Found = require("../Model/FoundModel");

// Get all found items
const getAllFound = async (req, res, next) => {
    try {
        const founds = await Found.find();
        return res.status(200).json(founds);
    } catch (err) {
        console.error("Error fetching found items:", err);
        return res.status(500).json({ message: "Error fetching found items", error: err.message });
    }
};

// Add new found item
const addFound = async(req, res, next) => {
    try {
        console.log("Received found item data:", req.body);
        console.log("Received files:", req.files);
        
        const {
            finderName,
            phone,
            location,
            findDate,
            findTime,
            bagDescription,
            bagColor,
            bagSize
        } = req.body;

        // Handle file uploads
        let qrCodeImage = null;
        let bagImage = null;
        if (req.files) {
            if (req.files.qrCodeImage) {
                qrCodeImage = req.files.qrCodeImage[0].filename;
            }
            if (req.files.bagImage) {
                bagImage = req.files.bagImage[0].filename;
            }
        }

        // Validate required fields
        const requiredFields = [
            'finderName', 'phone', 'location', 
            'findDate', 'findTime', 'bagDescription', 
            'bagColor', 'bagSize'
        ];
        
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            console.error("Missing required fields:", missingFields);
            return res.status(400).json({ 
                message: "Missing required fields", 
                missingFields 
            });
        }

        const found = new Found({
            finderName,
            phone,
            location,
            findDate: new Date(findDate),
            findTime,
            bagDescription,
            bagColor,
            bagSize,
            qrCodeImage,
            bagImage,
            status: 'Unmatched'
        });
        
        console.log("Creating found item:", found);
        const savedFound = await found.save();
        console.log("Successfully saved found item:", savedFound);
        return res.status(201).json(savedFound);
    } catch(err) {
        console.error("Error adding found item:", err);
        return res.status(500).json({ 
            message: "Unable to add Found item", 
            error: err.message,
            stack: err.stack
        });
    }
};

// Get found item by ID
const getFoundById = async(req, res, next) => {
    const id = req.params.id;
    try {
        const found = await Found.findById(id);
        if (!found) {
            return res.status(404).json({ message: "Found item not found" });
        }
        return res.status(200).json(found);
    } catch(err) {
        console.error("Error fetching found item by ID:", err);
        return res.status(500).json({ message: "Error fetching found item", error: err.message });
    }
};

// Update found item
const updateFound = async(req, res, next) => {
    const id = req.params.id;
    try {
        // Handle file uploads
        let updateData = { ...req.body };
        if (req.files) {
            if (req.files.qrCodeImage) {
                updateData.qrCodeImage = req.files.qrCodeImage[0].filename;
            }
            if (req.files.bagImage) {
                updateData.bagImage = req.files.bagImage[0].filename;
            }
        }
        // If findDate is present, ensure it's a Date object
        if (updateData.findDate) {
            updateData.findDate = new Date(updateData.findDate);
        }
        const found = await Found.findByIdAndUpdate(id, updateData, { new: true });
        if (!found) {
            return res.status(404).json({ message: "Found item not found" });
        }
        return res.status(200).json(found);
    } catch(err) {
        console.error("Error updating found item:", err);
        return res.status(500).json({ message: "Error updating found item", error: err.message });
    }
};

// Delete found item
const deleteFound = async(req, res, next) => {
    const id = req.params.id;
    try {
        const found = await Found.findByIdAndDelete(id);
        if (!found) {
            return res.status(404).json({ message: "Found item not found" });
        }
        return res.status(200).json({ message: "Found item deleted successfully" });
    } catch(err) {
        console.error("Error deleting found item:", err);
        return res.status(500).json({ message: "Error deleting found item", error: err.message });
    }
};

module.exports = {
    getAllFound,
    addFound,
    getFoundById,
    updateFound,
    deleteFound
};
