const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')

router.get('/allProducts', (req, res, next) => {
    Product.find()
        .then(data => res.json(data)) 
        .catch(err => console.log(err))
})

router.get('/oneProduct/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.post('/postProduct', (req, res, next) => {
    Product.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.post('/:id/update', (req, res, next) => {

    const {category, name, price, leatherType} = req.body

    Product.findByIdAndUpdate(req.params.id, {category, name, price, leatherType})
    .then(() => res.redirect(`/api/products`))
    .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res, next) => {

    const {category, name, price, leatherType} = req.body

    Product.findByIdAndRemove(req.params.id, {category, name, price, leatherType})
    .then(() => res.redirect(`/api/products`))
    .catch(err => console.log(err))
})

module.exports = router
