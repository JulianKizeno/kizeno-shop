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
    const { id } = req.params;

    Product.findByIdAndUpdate(req.params.id, {category, name, price, leatherType})
    .then(() => {
        res.status(200).json({ message: `Product ${id} updated` });
      })
    .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res, next) => {

    const {category, name, price, leatherType} = req.body
    const { id } = req.params;

    Product.findByIdAndRemove(req.params.id, {category, name, price, leatherType})
    .then((deletedProduct) => {
        console.log(deletedProduct)
        res.status(200).json({ deletedProduct : deletedProduct._id });
      })
    .catch(err => console.log(err))
})

module.exports = router
