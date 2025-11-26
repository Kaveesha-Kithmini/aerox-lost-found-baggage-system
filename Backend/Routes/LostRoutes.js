const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

//Insert Model
const Lost = require("../Model/LostModel");

//Insert Lost Controller
const LostController = require("../Controllers/LostControllers");

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

router.get("/", LostController.getAllLost);
router.post("/", upload.fields([
    { name: 'qrCodeImage', maxCount: 1 },
    { name: 'bagImage', maxCount: 1 }
]), LostController.addLosts);
router.get("/:id", LostController.getById);
router.put("/:id", LostController.updateLost);
router.delete("/:id", LostController.deleteLost);

//export
module.exports = router;
