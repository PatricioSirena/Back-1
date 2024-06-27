const express = require('express')
const router = express.Router()
const {createProduct, deleteProduct, getProductByIdOrProducts, updateProduct} = require('../controllers/productos')

router.get('/', getProductByIdOrProducts)

router.post('/', createProduct)

router.put('/:idProducto', updateProduct)

router.delete('/:idProducto', deleteProduct)

module.exports = router