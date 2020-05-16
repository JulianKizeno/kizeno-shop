const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')

router.get('/allProducts', (req, res, next) => {
    Product.find()
    .then(data => res.status(200).json(data)) 
    .catch(err => {res.status(500).json({message: err.message, status: 500})})
})

router.get('/oneProduct/:id', (req, res, next) => {
    Product.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {res.status(500).json({message: err.message, status: 500})})
})

router.post('/postProduct', (req, res, next) => {
    Product.create(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => {res.status(500).json({message: err.message, status: 500})})
})

router.post('/:id/update', (req, res, next) => {

    const {category, name, price, leatherType} = req.body

    Product.findByIdAndUpdate(req.params.id, {category, name, price, leatherType})
    .then(() => {
        console.log(deletedProduct)
        res.status(200).json({ updatedProduct: updatedProduct._id });
      })
    .catch(err => {res.status(500).json({message: err.message, status: 500})})
})

router.post('/:id/delete', (req, res, next) => {

    const {category, name, price, leatherType} = req.body

    Product.findByIdAndRemove(req.params.id, {category, name, price, leatherType})
    .then((deletedProduct) => {
        console.log(deletedProduct)
        res.status(200).json({ deletedProduct : deletedProduct._id });
      })
    .catch(err => {
        console.log(err)
        return res.status(500).json({message: err.message, status: 500})
    })
})

module.exports = router
