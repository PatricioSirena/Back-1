const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
        password: {
            type: String,
            required: true
},
    active:{
        type:Boolean,
        default:false
    },
    admin:{
        type:Boolean,
        default:false
    }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel