const express = require('express')
const {createProducts, deleteProducts, getProductByIdOrProducts, updateProducts, addImage} = require('../controllers/products')
const {check} = require('express-validator')
const {validateFields} = require('../middlewares/validateFields')
const auth = require('../middlewares/auth')
const router = express.Router()


router.get('/', getProductByIdOrProducts)

router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener entre 2 y 40 caracteres').isLength({min: 2, max: 40}),
    check('description', 'La descripción es requerida').not().isEmpty(),
    check('description', 'La descripción debe tener un maximo de 200 caracteres').isLength({max:200}),
    check('price', 'El precio es requerido').not().isEmpty(),
    check('price', 'El precio debe ser un numero').isNumeric(),
    validateFields
], auth('admin'), createProducts)

router.post('/addImage/:idProduct', auth('admin'), addImage)

router.put('/:idProduct', [
    check('idProduct', 'No es un ID valido').isMongoId(),
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener entre 2 y 40 caracteres').isLength({min: 2, max: 40}),
    check('description', 'La descripción es requerida').not().isEmpty(),
    check('description', 'La descripción debe tener un maximo de 200 caracteres').isLength({max:200}),
    check('price', 'El precio es requerido').not().isEmpty(),
    check('price', 'El precio debe ser un numero').isNumeric(),
    validateFields
], auth('admin'), updateProducts)

router.delete('/:idProduct', [
    check('idProduct', 'No es un ID valido').isMongoId(),
    validateFields
], auth('admin'), deleteProducts)

module.exports = router