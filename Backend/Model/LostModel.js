const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lostSchema = new Schema({
    passengerName: {
        type: String,
        required: true
    },
    passengerId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    }, 
    airline: {
        type: String,
        required: true
    }, 
    flightNumber: {
        type: String,
        required: true
    }, 
    flightDate: {
        type: Date,
        required: true
    }, 
    flightTime: {
        type: String,
        required: true
    }, 
    bagSize: {
        type: String,
        required: true
    },
    bagColor: {
        type: String,
        required: true
    },
    bagBrand: {
        type: String,
        required: true
    }, 
    uniqueIdentifiers: {
        type: String,
        required: true
    },
    dateOfLoss: {
        type: Date,
        required: true
    },
    lastSeenLocation: {
        type: String,
        required: true
    },
    qrCodeImage: {
        type: String,
        required: false
    },
    bagImage: {
        type: String,
        required: false
    },
    whatsappNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Matched', 'Claimed'],
        default: 'Pending'
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});

// Add a virtual getter for image URLs
lostSchema.virtual('qrCodeImageUrl').get(function() {
    if (this.qrCodeImage) {
        return `/uploads/${this.qrCodeImage.split('/').pop()}`;
    }
    return null;
});

lostSchema.virtual('bagImageUrl').get(function() {
    if (this.bagImage) {
        return `/uploads/${this.bagImage.split('/').pop()}`;
    }
    return null;
});

// Ensure virtuals are included in toJSON
lostSchema.set('toJSON', { virtuals: true });
lostSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("LostModel", lostSchema);
