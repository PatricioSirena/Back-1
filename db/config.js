const mongoose = require('mongoose')


    try {
        mongoose.connect(process.env.MONGO_DBN_CNN).then(() => console.log('DB conectada'));
    } catch (error) {
        console.log(error);
    }


module.exports = mongoose