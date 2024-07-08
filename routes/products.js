const express = require('express')
const {createProducts, deleteProducts, getProductByIdOrProducts, updateProducts} = require('../controllers/products')
const router = express.Router()

router.get('/', getProductByIdOrProducts)

router.post('/', createProducts)

router.put('/:idProduct', updateProducts)

router.delete('/:idProduct', deleteProducts)

module.exports = router