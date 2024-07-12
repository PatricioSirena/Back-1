const express = require('express')
const router = express.Router()
const { getUsers, createUser, updateUser, deleteUser, getUser, activateOrDesactivateUser, userLogin } = require('../controllers/users')

router.get('/', getUsers)

router.get('/:userId', getUser)

router.post('/login', userLogin)

router.post('/', createUser)

// router.put('/:userId', updateUser)

router.put('/:userId', activateOrDesactivateUser)

router.delete('/:userId', deleteUser)

module.exports = router