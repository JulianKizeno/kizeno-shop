const mongoose = require('mongoose')
const Schema = mongoose.Schema  

const productSchema = new Schema({
    category: {
        type: String,
        enum: ['handbag', 'purse', 'shoes', 'belt', 'wallet', 'coin purse', 'card case']
    }, 
    img: {
        type: String,
        required: true,
        default: 'https://www.bon-bonite.com/wp-content/uploads/2020/01/179197-A.png'
    },
    stock: Number,
    name: String,
    price: String,
    leatherType: {
        type: String,
        enum: ['CUERO DE BUFALO 2376','VACUNO ENGRASADO 2374','PIEZA VACUNO COCO 2370','ANTE FANTASÍA 2369','SERRAJE VERDE 2383',
                'CHAROL', 'FLOTER 2312', 'AMAZONAS BLUE 2310']
    },  
}, 
{
    timestamps: true
})
const Product = mongoose.model('Product', productSchema)
module.exports = Product