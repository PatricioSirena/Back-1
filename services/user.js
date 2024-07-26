const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRegistrerMessage = require('../helpers/nodemailer.registrer')
const CartModel = require('../models/cart')
const FavoriteModel = require('../models/favorite')


const newUser = async (body) => {
    try {
        const userExist = await UserModel.findOne({ userName: body.userName })
        const emailExist = await UserModel.findOne({ email: body.email })

        if (userExist) {
            return 401
        } else if (emailExist) {
            return 406
        } 
        if(body.rol !== undefined){
            return 409
        }
            userRegistrerMessage(body.userName, body.email)
            let salt = bcrypt.genSaltSync()
            body.password = bcrypt.hashSync(body.password, salt)
            const userCreated = new UserModel(body)
            const userCart = new CartModel({userId: userCreated._id})
            const userFav = new FavoriteModel({userId: userCreated._id})

            userCreated.cartId = userCart._id
            userCreated.favoriteId = userFav._id

            await userCart.save()
            await userFav.save()
            await userCreated.save()
            return 201
        
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
            return {code: 400}
        } else{
            const validatedUser = bcrypt.compareSync(body.password, userExist.password)
            if (validatedUser) {
                const payload = {
                    id: userExist._id,
                    rol: userExist.rol,
                    active: userExist.active
                }

                const token = jwt.sign(payload, process.env.JWT_KEY)
                return {code: 200, token}
        } else {
            return {code: 401}
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