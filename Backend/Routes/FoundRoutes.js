const express = require("express");
const router = express.Router();
const FoundController = require("../Controllers/FoundControllers");

// Add multer for file uploads
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get("/", FoundController.getAllFound);
router.post("/", upload.fields([
    { name: 'qrCodeImage', maxCount: 1 },
    { name: 'bagImage', maxCount: 1 }
]), FoundController.addFound);
router.get("/:id", FoundController.getFoundById);
router.put("/:id", upload.fields([
    { name: 'qrCodeImage', maxCount: 1 },
    { name: 'bagImage', maxCount: 1 }
]), FoundController.updateFound);
router.delete("/:id", FoundController.deleteFound);

module.exports = router;
