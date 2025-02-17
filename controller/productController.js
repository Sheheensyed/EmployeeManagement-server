// import products
const products = require('../model/productModel')

exports.addProductController = async (req, res) => {
    console.log('inside add-product controller');

    const { productName, variant, mileage, fuelType, price } = req.body
    console.log(productName, variant, mileage, fuelType, price);

    const productImage = req.file.filename
    console.log(productImage);



    try {
        const existingProduct = await products.findOne({ productName })

        if (existingProduct) {
            res.status(406).json(`Product already exist`)
        } else {
            const newProduct = new products({
                productName, variant, mileage, fuelType, price, productImage
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (error) {
        res.status(401).json({ message: `Product adding failed due to`, error })
    }

    // res.status(200).json(`request recieved`)
}

// get all products
exports.getAllProductsController = async (req, res) => {
    // path parameter = req.params
    // query parameter = req.query
    const searchkey = req.query.search
    console.log(searchkey);
    const query = {
        language:{
            $regex:searchkey, $options:"i"
        }
    }
    
    try {
        const allProducts = await products.find()
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all home products
exports.getHomeProductsController = async (req, res) => {
    try {
        const allProducts = await products.find().limit(7)
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(401).json(error)
    }
}