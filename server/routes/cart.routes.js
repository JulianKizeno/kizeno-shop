const express = require('express')
const router = express.Router()

const Cart = require('../models/cart.model')

router.get('/oneCart/:id', (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Unauthorized' })
    if (String(req.user._id) !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    Cart.find({ owner: req.params.id })
    .then(data => res.json(data[0])) 
    .catch(err => {res.status(500).json({message: err.message, status: 500})})
})

module.exports = router