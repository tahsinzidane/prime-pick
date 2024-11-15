const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    hms:{
        type: Number,
        required: true,
    },
    Image:{
        type: String,
        required: true,
    },
    uploadedAt:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('product', productSchema);