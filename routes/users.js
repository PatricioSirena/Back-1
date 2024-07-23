const express = require('express')
const router = express.Router()
const { getUsers, createUser, updateUser, deleteUser, getUser, activateOrDesactivateUser, userLogin } = require('../controllers/users')
const {check} = require('express-validator')
const {validateFields} = require('../middlewares/validateFields')
const auth = require('../middlewares/auth')

router.post('/', [
    check('userName', 'El nombre de usuario es requerido').not().isEmpty(),
    check('userName', 'El nombre debe tener entre 3 y 20 caracteres').isLength({min:3,max:20}),
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('password', 'La contraseña debe tener entre 8 y 40 caracteres').isLength({min:8,max:40}),
    validateFields
], createUser)

router.post('/login', [
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('password', 'La contraseña debe tener entre 8 y 40 caracteres').isLength({min:8, max:40}),
    validateFields
], userLogin)

router.get('/', auth('admin'), getUsers)

router.get('/:userId', [
    check('userId', 'No es un ID valido').isMongoId(),
    validateFields
], auth('admin'), getUser)

// router.put('/:userId', updateUser)

router.put('/:userId', [
    check('userId', 'No es un ID valido').isMongoId(),
    validateFields
], auth('admin'), activateOrDesactivateUser)

router.delete('/:userId', [
    check('userId', 'No es un ID valido').isMongoId(),
    validateFields
], auth('admin'), deleteUser)

module.exports = router