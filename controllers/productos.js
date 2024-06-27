let productos = [
    {
        id: 1,
        nombre: "Producto 1",
        precio: 100
    },
    {
        id: 2,
        nombre: "Producto 2",
        precio: 150
    },
    {
        id: 3,
        nombre: "Producto 3",
        precio: 250
    }
]


const getProductByIdOrProducts = (req, res) =>{
        try {
            const id = Number(req.query.id)
            if(id){
                const producto = productos.find((prod) => prod.id === id)
                res.status(200).json(producto)
            } else{
                res.status(200).json(productos)
            }
        } catch (error) {
            res.status(500).json(error)
        }
}

const createProduct = (req, res) =>{
    try {
        const nuevoProducto = {
            id: productos[productos.length -1].id +1,
            ...req.body
        }
        productos.push(nuevoProducto)
        res.status(201).json(nuevoProducto)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateProduct = (req, res) =>{
    try {
        const id = Number(req.params.idProducto)
        const posicionProducto = productos.findIndex((prod) => prod.id === id)
        const productoEditado = {
            id,
            ...req.body
        }
        productos[posicionProducto] = productoEditado
        res.status(200).json(productos[posicionProducto])
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProduct = (req,res) =>{
    try {
        const id = Number(req.params.idProducto)
        const productosNoBorrados = productos.filter((producto) => producto.id !== id)
        productos = productosNoBorrados
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getProductByIdOrProducts,
    createProduct,
    updateProduct,
    deleteProduct
}