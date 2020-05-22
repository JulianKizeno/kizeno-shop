const mongoose = require('mongoose')
const Schema = mongoose.Schema  

const productSchema = new Schema({
    category: {
        type: String,
        enum: ['handbag', 'purse', 'belt', 'wallet', 'card holder']
    }, 
    name: String,
    price: Number,
    leatherType: String,
    img: String,
    stock: Number
}, 
{
    timestamps: true
})
const Product = mongoose.model('Product', productSchema)
module.exports = Product