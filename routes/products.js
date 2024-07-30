const express = require('express')
const { createProducts, 
        deleteProducts, 
        getProductByIdOrProducts, 
        updateProducts, 
        addImage, 
        searchProductByTerm, 
        addToCart, 
        deleteFromCart, 
        addToFav, 
        deleteFromFav} = require('../controllers/products')
const {check} = require('express-validator')
const {validateFields} = require('../middlewares/validateFields')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const router = express.Router()


router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener entre 2 y 40 caracteres').isLength({min: 2, max: 40}),
    check('description', 'La descripción es requerida').not().isEmpty(),
    check('description', 'La descripción debe tener un maximo de 200 caracteres').isLength({max:200}),
    check('price', 'El precio es requerido').not().isEmpty(),
    check('price', 'El precio debe ser un numero').isNumeric(),
    validateFields
], auth('admin'), createProducts)

router.post('/addImage/:idProduct', multer.single('image'), addImage)

router.post('/addToCart/:idProduct', auth('user'), addToCart)

router.post('/deleteFromCart/:idProduct', auth('user'), deleteFromCart)

router.post('/addToFav/:idProduct', auth('user'), addToFav)

router.post('/deleteFromFav/:idProduct', auth('user'), deleteFromFav)

router.get('/', getProductByIdOrProducts)

router.get('/searchProduct', searchProductByTerm)

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