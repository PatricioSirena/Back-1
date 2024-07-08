require('../db/config')
const express = require('express')
const path = require('path')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080
        this.middleware()
        this.routes()
    }

    middleware() {
        this.app.use(express.json())
        this.app.use(express.static(path.join(__dirname, '../public')))
        this.app.use(cors())
    }

    routes(){
    this.app.use('/api/products', require('../routes/products'))
    this.app.use('/api/users', require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server Activo', this.port);
        })
    }
}

module.exports = Server