const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    productDescription: { type: String, required: true },
    productImage: { type: String, required: true },
    productTags: { type: Array, required: true },
    productPrice: { type: Number, required: true },
    stock: { type: Number, default: 50 },
    productDetails: { type: Array }
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Products", ProductSchema)

