const mongoose = require("mongoose");

const foundSchema = new mongoose.Schema({
    finderName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    findDate: {
        type: Date,
        required: true,
    },
    findTime: {
        type: String,
        required: true,
    },
    bagDescription: {
        type: String,
        required: true,
    },
    bagColor: {
        type: String,
        required: true,
    },
    bagSize: {
        type: String,
        required: true,
    },
    qrCodeImage: {
        type: String,
        required: false,
    },
    bagImage: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['Unmatched', 'Matched', 'Returned', 'Closed'],
        default: 'Unmatched'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Found", foundSchema);
