const ProductModel = require('../models/products')


const newProduct = async (body) => {
    try {
        const newItem = await new ProductModel(body)
        return newItem
    } catch (error) {
        console.log(error);
    }
}

const getOneProduct = async (id) => {
    try {
        const product = await ProductModel.findById({_id: id})
        return product
    } catch (error) {
        console.log(error);
    }
}

const getAllProducts = async () => {
    try {
        const products = await ProductModel.find()
        return products    
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async (id, body) => {
    try {
        const editedProduct = await ProductModel.findByIdAndUpdate({_id: id}, body, { new: true })
        return editedProduct
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await ProductModel.findByIdAndDelete(id)
        if(response){
            return 200
        }else {
            return 404
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    newProduct,
    getOneProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}