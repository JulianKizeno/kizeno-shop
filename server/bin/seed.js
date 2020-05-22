require("dotenv").config();
const mongoose = require('mongoose')
const Product = require('../models/product.model')
const User = require('../models/user.model')
const Cart = require('../models/cart.model')

const bcrypt = require("bcrypt")
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)

mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })

// User.collection.drop();
// Product.collection.drop();
// Cart.collection.drop();

const products = [ 
    {
        category: 'handbag',
        name: 'Hermes',
        price: 650,
        leatherType: 'VACUNO ENGRASADO',
        img: 'https://www.loewe.com/dw/image/v2/BBPC_PRD/on/demandware.static/-/Sites-Loewe_master/default/dw3a8786ec/images/321.12.U62/321.12.U62_6434_1F.jpg?sw=1200&sfrm=jpg&sm=fit&q=90'
    },
    {
        category: 'handbag',
        name: 'ok',
        price: 650,
        leatherType: 'SERRAJE VERDE',
        img: 'https://www.loewe.com/dw/image/v2/BBPC_PRD/on/demandware.static/-/Sites-Loewe_master/default/dw36389b3d/images/322.30YS21/322.30YS21_1754_1F.jpg?sw=1200&sfrm=jpg&sm=fit&q=90'
    },
    {
        category: 'handbag',
        name: 'adios',
        price: 650,
        leatherType: 'CUERO DE BUFALO',
        img: 'https://www.loewe.com/dw/image/v2/BBPC_PRD/on/demandware.static/-/Sites-Loewe_master/default/dw408a9496/images/A223099X02/A223099X02_9943_1F.jpg?sw=1200&sfrm=jpg&sm=fit&q=90'
    },
    {
        category: 'handbag',
        name: 'hola',
        price: 650,
        leatherType: 'AMAZONAS BLUE',
        img: 'https://www.loewe.com/dw/image/v2/BBPC_PRD/on/demandware.static/-/Sites-Loewe_master/default/dw0baecc0d/images/326.75AC31/326.75AC31_2530_1F.jpg?sw=1200&sfrm=jpg&sm=fit&q=90'
    },
    {
        category: 'purse',
        name: 'Vallarta',
        price: 300,
        leatherType: 'FLOTER',
        img: 'https://www.loewe.com/dw/image/v2/BBPC_PRD/on/demandware.static/-/Sites-Loewe_master/default/dw32078d8c/images/328.72.V07/328.72.V07_2912_1F.jpg?sw=1200&sfrm=jpg&sm=fit&q=90'
    },
    {
        category: 'card holder',
        name: 'High Heel',
        price: 500,
        leatherType: 'CUERO DE BUFALO',
        img: 'https://www.loewe.com/dw/image/v2/BBPC_PRD/on/demandware.static/-/Sites-Loewe_master/default/dw17fac790/images/128.30WV33/128.30WV33_6212_1F.jpg?sw=1200&sfrm=jpg&sm=fit&q=90'
    },
    {
        category: 'handbag',
        name: 'Tenerife',
        price: 520,
        leatherType: 'VACUNO ENGRASADO',
        img: 'https://www.loewe.com/dw/image/v2/BBPC_PRD/on/demandware.static/-/Sites-Loewe_master/default/dw6afb4114/images/128.30WM88/128.30WM88_5463_1F.jpg?sw=1200&sfrm=jpg&sm=fit&q=90'
    },
    {
        category: 'wallet',
        name: "Kizeno's Wallet",
        price: 20,
        leatherType: 'PIEZA VACUNO COCO',
        img: 'https://www.loewe.com/dw/image/v2/BBPC_PRD/on/demandware.static/-/Sites-Loewe_master/default/dwf16fca6e/images/128.30WK07/128.30WK07_5463_1F.jpg?sw=1200&sfrm=jpg&sm=fit&q=90'
    },
    {
        category: 'handbag',
        name: 'coin purse',
        price: 110,
        leatherType: 'ANTE FANTASÍA',
        img: 'https://es.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--M43713_PM2_Front%20view.jpg?wid=1024&hei=1024'
    },
    {
        category: 'belt',
        name: 'braided belt',
        price: 89,
        leatherType: 'SERRAJE VERDE',
        img: 'https://www.loewe.com/dw/image/v2/BBPC_PRD/on/demandware.static/-/Sites-Loewe_master/default/dw4e085615/images/515.01.011/515.01.011_2544_2F.jpg?sw=528&sfrm=jpg&sm=fit&q=90'
    },
]

const users = [
    {
        username: 'Daniel',
        password: bcrypt.hashSync('hello', salt),
        email: 'dani@ironhack.com',
        role: 'ADMIN'
    },
    {
        username: 'Sara',
        password: bcrypt.hashSync('olakase', salt),
        email: 'sara@ironhack.com',
        role: 'CLIENT'
    }

]


const createCarts = (userId) =>{
    return {
        owner: userId,
        products: [],
        created: new Date,
        qtyProducts: 0,
        total: 0,
      }
}

Product.create(products)
    .then(allTheProducts => console.log(`${allTheProducts.length} Products created!`))
    .catch(err => console.log(`An error ocurred: ${err}`))   

User.create(users)
    .then(userCreated => {
        console.log(`${userCreated.length} Users created!`)
        let allCarts = [];
        userCreated.forEach((user) => {
            const carts = new Array(1)
                .fill()
                .map(() => createCarts(user.id))
                carts.forEach((cart) => {
                    allCarts.push(cart)
            })
        })
        Cart.create(allCarts)
            .then(() => console.log("carritos creados"))
            .catch(err => console.log(`An error ocurred: ${err}`))      
    })
    .catch(err => console.log(`An error ocurred: ${err}`))      