const express = require('express')
const router = express.Router()
const { requireAdmin } = require('../middleware/authorization')

const Product = require('../models/product.model')
// Explicit fields prevent client-supplied update operators and protected fields.
const productFields = body => {
    const result = {}
    for (const key of ['category', 'name', 'leatherType', 'img']) {
        if (typeof body[key] === 'string') result[key] = body[key]
    }
    for (const key of ['price', 'stock']) {
        if ((typeof body[key] === 'number' || typeof body[key] === 'string') &&
            body[key] !== '' && Number.isFinite(Number(body[key])) && Number(body[key]) >= 0) {
            result[key] = Number(body[key])
        }
    }
    return result
}


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

router.post('/postProduct', requireAdmin, (req, res, next) => {
    Product.create(productFields(req.body))
    .then(data => res.status(200).json(data))
    .catch(err => {res.status(500).json({message: err.message, status: 500})})
})

router.post('/:id/update', requireAdmin, (req, res, next) => {
    
    Product.findByIdAndUpdate(req.params.id, { $set: productFields(req.body) }, { runValidators: true })
    .then(updatedProduct => {
        console.log(updatedProduct)
        res.status(200).json(updatedProduct);
      })
    .catch(err => {res.status(500).json({message: err.message, status: 500})})
})

router.post('/:id/delete', requireAdmin, (req, res, next) => {

    const {category, name, price, leatherType} = req.body

    Product.findByIdAndRemove(req.params.id, {category, name, price, leatherType})
    .then((deletedProduct) => {
        console.log(deletedProduct)
        res.status(200).json({ deletedProduct : deletedProduct._id });
      })
    .catch(err => {res.status(500).json({message: err.message, status: 500})})

})

module.exports = router
