let usuarios = [
    {
        id: 1,
        userName: "Usuario 1",
        email: 'usuario1@gmail.com',
        password: 'asd123'
    },
    {
        id: 2,
        userName: "Usuario 2",
        email: 'usuario2@gmail.com',
        password: 'qwe123'
    },
    {
        id: 3,
        userName: "Usuario 3",
        email: 'usuario3@gmail.com',
        password: 'zxc123'
    }
]

const createUser = (req, res) => {
    try {
        const body = req.body
        const userNameExist = usuarios.find((usuario) => usuario.userName === body.userName)
        const emailExist = usuarios.find((usuario) => usuario.email === body.email)

        if (userNameExist) {
            return res.status(400).json({ msg: `El correo ${body.email} ya esta registrado` })
        } else if (emailExist) {
            return res.status(400).json({ msg: `El usuario ${body.userName} ya esta registrado` })
        } else{
            const id = crypto.randomUUID()
            usuarios.push({ id, active: false, ...body })
            return res.status(200).json({msg: 'Usuario registrado con exito'})
        }


    } catch (error) {
        res.status(500).json(error)
    }
}

const getUser = (req, res) => {
    try {
        const id = Number(req.params.userId)
        const user = usuarios.find((usuario) => usuario.id === id)
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe' })
        }else{
            return res.status(200).json(user)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUsers = (req, res) => {
    try {
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateUser = (req, res) => {
    try {
        const id = Number(req.params.userId)
        const body = req.body
        const userToEdit = usuarios.find((usuario) => usuario.id === id)
        if (!userToEdit) {
            return res.status(400).json({ msg: 'El usuario no existe' })
        } else{
            userToEdit = body
            return res.status(200).json(userToEdit)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const activateOrDesactivateUser = (req, res) => {
    try {
        const id = Number(req.params.userId)
        const userToEdit = usuarios.findIndex((usuario) => usuario.id === id)
        usuarios[userToEdit].active = !usuarios[userToEdit].active
        const message = userToEdit.active? 'El usuario se ha activado' : 'El usuario se ha desactivado'
        res.status(200).json({msg: message})
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteUser = (req, res) => {
    try {
        const id = Number(req.params.userId)
        const userToDelete = usuarios.findIndex((usuario) => usuario.id === id)
        usuarios.splice(userToDelete, 1)
        res.status(200).json({msg: 'El usuario se ha eliminado' })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    activateOrDesactivateUser,
    deleteUser
}