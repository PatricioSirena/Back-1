const productServices = require('../services/products')

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
        const cloudImage = await productServices.addImageToProduct(req.params.idProduct, req.file)
        if(cloudImage === 200){
            res.status(200).json({message: 'Imagen cargada correctamente'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const addToCart = async (req, res) =>{
    try {
        const result = await productServices.addProductToCart(req.userId, req.params.idProduct)

        if(result.statusCode === 200){
            res.status(200).json({message: result.msg})
        } else{
            res.status(400).json({message: result.msg})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteFromCart = async(req, res) =>{
    try {
        const result = await productServices.deleteProductFromCart(req.userId, req.params.idProduct)

        if(result.statusCode === 200){
            res.status(200).json({message: result.msg})
        } else{
            res.status(400).json({message: result.msg})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const addToFav = async (req, res) =>{
    try {
        const result = await productServices.addProductToFav(req.userId, req.params.idProduct)

        if(result.statusCode === 200){
            res.status(200).json({message: result.msg})
        } else {
            res.status(400).json({message: result.msg})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteFromFav = async (req, res) =>{
    try {
        const result = await productServices.deleteProductFromFav(req.userId, req.params.idProduct)

        if(result.statusCode === 200){
            res.status(200).json({message: result.msg})
        } else {
            res.status(400).json({message: result.msg})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getProductByIdOrProducts = async (req, res) =>{
        try {
            const id = req.query.id
            const limit = req.query.limit || 10
            const to = req.query.to || 0

            if(id){
                const producto = await productServices.getOneProduct(id)
                res.status(200).json(producto)
            } else{
                const productos = await productServices.getAllProducts(limit, to)
                res.status(200).json(productos)
            }
        } catch (error) {
            res.status(500).json(error)
        }
}

const searchProductByTerm = async (req, res) =>{
    try {
        const result = await productServices.searchProduct(req.query.term)
        res.status(200).json(result)
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
    addImage,
    searchProductByTerm,
    addToCart,
    deleteFromCart,
    addToFav,
    deleteFromFav
}