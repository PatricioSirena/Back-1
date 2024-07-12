const userServices = require('../services/user')


const createUser = async (req, res) => {
    try {
        const newUser = await userServices.newUser(req.body)
        if (newUser === 401) {
            res.status(401).json({ msg: 'El nombre de usuario ya esta registrado' })
        } else if (newUser === 406) {
            res.status(406).json({ msg: 'El correo ya esta registrado' })
        } else {
            res.status(201).json({ msg: 'Ususario registrado con exito' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userServices.getOneUser(req.params.userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

// const updateUser = async (req, res) => {
//     try {
//         const id = Number(req.params.userId)
//         const body = req.body
//         const userToEdit = await userServices.
//         if (!userToEdit) {
//             return res.status(400).json({ msg: 'El usuario no existe' })
//         } else{
//             userToEdit = body
//             return res.status(200).json(userToEdit)
//         }
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

const activateOrDesactivateUser = async (req, res) => {
    try {
        const user = await userServices.userStatus(req.params.userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userServices.userToDelete(req.params.userId)
        if (user === 404) {
            res.status(404).json({ msg: 'Usuario no encontrado' })
        } else {
            res.status(200).json({ msg: 'Usuario eliminado con exito' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


const userLogin = async (req, res) => {
    try {
        const result = await userServices.login(req.body)
        if (result === 404) {
            res.status(404).json({ msg: 'Usuario no encontrado' })
        } else if (result === 401) {
            res.status(401).json({ msg: 'Contraseña incorrecta' })
        } else {
            res.status(200).json({ msg: 'Logueado con exito' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createUser,
    getUser,
    getUsers,
    // updateUser,
    activateOrDesactivateUser,
    deleteUser,
    userLogin
}