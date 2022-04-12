const mongoose = require("mongoose");
const schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productDesc: {
        type: String,
        required: true,
    },
    productInitialPrice: {
        type: Number,
        required: true,
    },
    creator: {
        type: schema.Types.ObjectId,
        ref: 'customer'
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default:new Date.now
    },
})
module.exports = mongoose.model("product", productSchema);
