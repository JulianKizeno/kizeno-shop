const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/authorization')

const Cart = require('../models/cart.model')

router.get('/oneCart/:id', requireAuth, (req, res, next) => {
    if (String(req.user._id) !== req.params.id && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Access denied' })
    }

    Cart.find({ owner: req.params.id })
    .then(data => res.json(data[0])) 
    .catch(err => {res.status(500).json({message: err.message, status: 500})})
})

module.exports = router