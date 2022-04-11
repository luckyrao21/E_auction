const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    customerRoll: {
        type: String
    },
    joiningDate: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("customer", customerSchema);