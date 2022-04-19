const mongoose = require('../../database');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cod: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    amount: {
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;