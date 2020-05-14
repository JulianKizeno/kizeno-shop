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
        price: '650€',
        leatherType: 'VACUNO ENGRASADO 2374'
    },
    {
        category: 'handbag',
        name: 'ok',
        price: '650€',
        leatherType: 'SERRAJE VERDE 2383'
    },
    {
        category: 'handbag',
        name: 'adios',
        price: '650€',
        leatherType: 'CUERO DE BUFALO 2376'
    },
    {
        category: 'handbag',
        name: 'hola',
        price: '650€',
        leatherType: 'AMAZONAS BLUE 2310'
    },
    {
        category: 'purse',
        name: 'Vallarta',
        price: '300€',
        leatherType: 'FLOTER 2312'
    },
    {
        category: 'shoes',
        name: 'High Heel',
        price: '500€',
        leatherType: 'CUERO DE BUFALO 2376'
    },
    {
        category: 'handbag',
        name: 'Tenerife',
        price: '520€',
        leatherType: 'VACUNO ENGRASADO 2374'
    },
    {
        category: 'wallet',
        name: "Kizeno's Wallet",
        price: '200€',
        leatherType: 'PIEZA VACUNO COCO 2370'
    },
    {
        category: 'coin purse',
        name: 'coin purse',
        price: '110€',
        leatherType: 'ANTE FANTASÍA 2369'
    },
    {
        category: 'belt',
        name: 'braided belt',
        price: '89.99€',
        leatherType: 'SERRAJE VERDE 2383'
    },
]

const users = [
    {
        username: 'Daniel',
        password: bcrypt.hashSync('hello', salt),
        email: 'dani@ironhack.com',
        roll: 'CLIENT'
    },
    {
        username: 'Rodrigo',
        password: bcrypt.hashSync('goodbye', salt),
        email: 'rodrigo@ironhack.com',
        roll: 'CLIENT'
    },
    {
        username: 'Sara',
        password: bcrypt.hashSync('olakase', salt),
        email: 'sara@ironhack.com',
        roll: 'CLIENT'
    }

]


const createCarts = (userId) =>{
    return {
        owner: userId,
        products: [],
        created: new Date,
        totalPrice: 1200
      }
}
Product.create(products)
    .then(allTheProducts => {
        console.log(`${allTheProducts.length} Products created!`)
    })
User.create(users)
    .then(userCreated => {
        console.log(`${userCreated.length} Users created!`)
        let allCarts = [];
        userCreated.forEach((user) => {
            const carts = new Array(2)
                .fill()
                .map(() => createCarts(user.id))
                carts.forEach((cart) => {
                    allCarts.push(cart)
            })
        })
        Cart.create(allCarts)
            .then(() => console.log("carritos creados"))
    })
    .catch(err => console.log(`An error ocurred: ${err}`))      