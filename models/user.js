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
        unique:true,
        validate:{
            validator: function(value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: "No es un email valido"
        }
    },
        password: {
            type: String,
            required: true
    //         validate: {
    //             validator: function(value) {
    //             return /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
    //     },
    //     message: "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero"
    // }
},
    active:{
        type:Boolean,
        default:false
    }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel