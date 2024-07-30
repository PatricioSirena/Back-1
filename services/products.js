const ProductModel = require('../models/products')
const UserModel = require('../models/user')
const CartModel = require('../models/cart')
const FavModel = require('../models/favorite')
const cloudinary = require('../helpers/cloudinary')
const idGenerator = require('../helpers/idGenerator')


const newProduct = (body) => {
    try {
        const newItem = new ProductModel(body)
        return newItem
    } catch (error) {
        console.log(error);
    }
}

const addImageToProduct = async (productId, file) => {
    try {
        const product = await ProductModel.findOne({ _id: productId })
        const result = await cloudinary.uploader.upload(file.path)
        const imageId = idGenerator()
        const url = result.secure_url
        const image = { url, imageId }
        product.galery.push(image)
        await product.save()
        return 200
    } catch (error) {
        console.log(error)
    }
}

const addProductToCart = async (userId, productId) => {
    try {
        const user = await UserModel.findById(userId)
        const product = await ProductModel.findOne({ _id: productId })
        const cart = await CartModel.findOne({ _id: user.cartId })

        const productExist = cart.products.findIndex((prod) => prod._id.toString() === product._id.toString())

        if (productExist === -1) {
            cart.products.push(product)
            await cart.save()
            return {
                msg: 'Se agrego el producto al carrito',
                statusCode: 200
            }
        } else {
            return {
                msg: 'El producto ya existe en el carrito',
                statusCode: 400
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteProductFromCart = async (userId, productId) => {
    try {
        const user = await UserModel.findOne({ _id: userId })
        const product = await ProductModel.findOne({ _id: productId })
        const cart = await CartModel.findOne({ _id: user.cartId })

        const productExist = cart.products.findIndex((prod) => prod._id.toString() === product._id.toString())

        if (productExist !== -1) {
            cart.products.splice(productExist, 1)
            await cart.save()
            return {
                msg: 'Se elimino el producto del carrito',
                statusCode: 200
            }
        } else {
            return {
                msg: 'No se encontro el producto en el carrito',
                statusCode: 400
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const addProductToFav = async (userId, productId) => {
    try {
        const user = await UserModel.findById(userId)
        const product = await ProductModel.findOne({ _id: productId })
        const favorite = await FavModel.findOne({ _id: user.favoriteId })

        const productExist = favorite.products.findIndex((prod) => prod._id.toString() === product._id.toString())

        if (productExist === -1) {
            favorite.products.push(product)
            await favorite.save()
            return {
                msg: 'Se agrego el producto a favoritos',
                statusCode: 200
            }
        } else {
            return {
                msg: 'El producto ya existe en favoritos',
                statusCode: 400
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteProductFromFav = async (userId, productId) => {
    try {
        const user = await UserModel.findById(userId )
        const product = await ProductModel.findOne({ _id: productId })
        const favorite = await FavModel.findOne({ _id: user.favoriteId })

        const productExist = favorite.products.findIndex((prod) => prod._id.toString() === product._id.toString())

        if (productExist !== -1) {
            favorite.products.splice(productExist, 1)
            await favorite.save()
            return {
                msg: 'Se elimino el producto de favoritos',
                statusCode: 200
            }
        } else {
            return {
                msg: 'No se encontro el producto en favoritos',
                statusCode: 400
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const getOneProduct = async (id) => {
    try {
        const product = await ProductModel.findById({ _id: id })
        return product
    } catch (error) {
        console.log(error);
    }
}

const getAllProducts = async (limit, to) => {
    try {
        const [products, totalQuantity] = await Promise.all([
            ProductModel.find({ active: true }).skip(to * limit).limit(limit),
            ProductModel.countDocuments({ active: true })
        ])
        const pagination = {
            products,
            totalQuantity
        }

        return pagination
    } catch (error) {
        console.log(error)
    }
}

const searchProduct = async (term) => {
    const searchrule = new RegExp(term, 'i')
    const products = await ProductModel.find({
        $or: [
            { name: searchrule },
            { description: searchrule }
        ]
    })
    return products
}

const updateProduct = async (id, body) => {
    try {
        const editedProduct = await ProductModel.findByIdAndUpdate({ _id: id }, body, { new: true })
        return editedProduct
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await ProductModel.findByIdAndDelete({ _id: id })
        if (response) {
            return 200
        } else {
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
    deleteProduct,
    addImageToProduct,
    searchProduct,
    addProductToCart,
    deleteProductFromCart,
    addProductToFav,
    deleteProductFromFav
}