const express = require('express')
const router = express.Router()

const Cart = require('../models/cart.model')

// router.get('/allProducts', (req, res, next) => {
//     Cart.find()
//     .then(data => res.status(200).json(data)) 
//     .catch(err => {res.status(500).json({message: err.message, status: 500})})
// })

router.get('/oneProduct/:id', (req, res, next) => {
    Cart.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {res.status(500).json({message: err.message, status: 500})})
})

module.exports = router