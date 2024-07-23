const productServices = require('../services/products')


const getProductByIdOrProducts = async (req, res) =>{
        try {
            const id = req.query.id
            if(id){
                const producto = await productServices.getOneProduct(id)
                res.status(200).json(producto)
            } else{
                const productos = await productServices.getAllProducts()
                res.status(200).json(productos)
            }
        } catch (error) {
            res.status(500).json(error)
        }
}

const createProducts = async (req, res) =>{
    try {
        const newProduct = await productServices.newProduct(req.body)
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

const addImage = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateProducts = async (req, res) =>{
    try {
        const id = req.params.idProduct
        const editedProduct = await productServices.updateProduct(id, req.body)
        res.status(200).json(editedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProducts = async(req,res) =>{
    try {
        const id = req.params.idProduct
        const response = await productServices.deleteProduct(id)
        if (response === 200) {
            res.status(200).json({msg: 'Producto eliminado con exito'})
        } else{
            res.status(404).json({msg: 'Producto no encontrado'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getProductByIdOrProducts,
    createProducts,
    updateProducts,
    deleteProducts,
    addImage
}