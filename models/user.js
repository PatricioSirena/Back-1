const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    },
    rol: {
        type: String,
        default: 'user',
        enum:['user', 'admin']
    }
})

UserSchema.methods.toJSON = function(){
    const {password, __v, ...user} = this.toObject()
    return user
}

const UserModel = model('users', UserSchema)
module.exports = UserModel