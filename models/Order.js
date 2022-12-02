const mongoose = require("mongoose");
//our Schema for our orders
const OrderSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Order", OrderSchema);