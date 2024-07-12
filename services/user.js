const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const newUser = async (body) => {
    try {
        const userExist = await UserModel.findOne({ userName: body.userName })
        const emailExist = await UserModel.findOne({ email: body.email })

        if (userExist) {
            return 401
        } else if (emailExist) {
            return 406
        } else {
            let salt = bcrypt.genSaltSync()
            body.password = bcrypt.hashSync(body.password, salt)
            const userCreated = new UserModel(body)
            await userCreated.save()
            return 201
        }
    } catch (error) {
        console.log(error)
    }
}

const getOneUser = async (id) => {
    try {
        const user = await UserModel.findOne({ _id: id })
        return user
    } catch (error) {
        console.log(error)
    }
}

const getAllUsers = async () => {
    try {
        const users = await UserModel.find()
        return users
    } catch (error) {
        console.log(error)
    }
}

// const userUpdate = async (id, body) => {
//     try {
//         const user = await UserModel.findByIdAndUpdate(id, body, { new: true })
//         if (user) {
//             return user
//         } else {
//             return 404
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

const userStatus = async (id) => {
    try {
        const user = await UserModel.findById({_id: id})
        user.active = !user.active
        const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, user, { new: true })
        return updatedUser
    } catch (error) {
        console.log(error)
    }
}

const userToDelete = async (id) => {
    try {
        const user = await UserModel.findByIdAndDelete({_id: id})
        if (user) {
            return 201
        } else {
            return 404
        }
    } catch (error) {
        console.log(error)
    }
}

const login = async (body) =>{
    try {
        const userExist = await UserModel.findOne({email: body.email})
        if (!userExist) {
            return 404
        } else{
            const validatedUser = bcrypt.compareSync(body.password, userExist.password)
            if (validatedUser) {
                return 200
        } else {
            return 401
        }
    }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    newUser,
    getOneUser,
    getAllUsers,
    // userUpdate
    userStatus,
    userToDelete,
    login
}