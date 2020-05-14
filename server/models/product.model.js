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
        default: 'https://www.eluniversal.com.mx/sites/default/files/styles/f01-1023x630/public/2017/01/24/deultima_moda_bolsos_1.png?itok=BVBpuPhy'
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