const express = require('express')
const router = express.Router()

const Cart = require('../models/cart.model')

router.get('/oneCart/:id', (req, res, next) => {
    console.log(req.params.id)

    Cart.find({ owner: req.params.id })
    .then(data => res.json(data[0])) 
    .catch(err => {res.status(500).json({message: err.message, status: 500})})
})

module.exports = router