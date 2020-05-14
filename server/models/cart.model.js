const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    created: {
        type: Date,
        default: Date.now
    },
    totalPrice: Number 
}, 
{
    timestamps: true 
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart