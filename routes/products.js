const express = require('express')
const {createProducts, deleteProducts, getProductByIdOrProducts, updateProducts} = require('../controllers/products')
const router = express.Router()
const {check} = require('express-validator')
const {validateFields} = require('../middlewares/validateFields')

router.get('/', getProductByIdOrProducts)

router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener entre 2 y 40 caracteres').isLength({min: 2, max: 40}),
    check('description', 'La descripción es requerida').not().isEmpty(),
    check('description', 'La descripción debe tener un maximo de 200 caracteres').isLength({max:200}),
    check('price', 'El precio es requerido').not().isEmpty(),
    check('price', 'El precio debe ser un numero').isNumeric(),
    validateFields
], createProducts)

router.put('/:idProduct', [
    check('idProduct', 'No es un ID valido').isMongoId(),
    validateFields
], updateProducts)

router.delete('/:idProduct', [
    check('idProduct', 'No es un ID valido').isMongoId(),
    validateFields
], deleteProducts)

module.exports = router