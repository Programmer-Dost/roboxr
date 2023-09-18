import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import Order from "@/models/Order";

async function verifyAdmin(req) {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.admin_access_token;
    try {
        let decoded = await jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        let user = (decoded._id === process.env.ADMIN_ID)
        if (!user) { return false }
        return true
    } catch (err) { return false }
}


const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            let admin = await verifyAdmin(req);
            if (admin) {
                const { productName, productDescription, productImage, productTags, productPrice, productId, productDetails } = req.body;
                // Basic validation example: Check if required fields are provided.
                if (!productName || !productDescription || !productPrice || !productId) {
                    return res.status(400).json({ success: false, msg: "Required fields are missing." });
                }
                // Create a new product using the Product model.
                const newProduct = new Product({
                    productName, productDescription, productImage, productTags, productPrice, productId, productDetails,
                });
                // Save the new product to the database.
                await newProduct.save();
                return res.status(201).json({ success: true, msg: "Product added to database.", product: newProduct });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, msg: "Failed to create a new product." });
        }
    }

    if (req.method === 'GET') {
        try {
            if (req.query.search) {
                console.log(req.query.search);
                const searchQuery = req.query.search.replace(/\s+/g, "");
                const regexPattern = new RegExp(
                    searchQuery.split("").map((char) => `${char}.*`).join(""),
                    "i"
                );

                let products = await Product.find({
                    $or: [
                        { productTags: regexPattern },
                        { productDescription: regexPattern },
                        { productName: regexPattern },
                    ],
                });

                products = products.map((product) => ({
                    product,
                    similarityScore: calculateSimilarityScore(product, searchQuery),
                }));

                products.sort((a, b) => b.similarityScore - a.similarityScore);

                res.status(200).json({ success: true, product: products.map((p) => p.product) });
            }
        } catch (e) {
            console.error(e);
            return res.status(200).json({ success: false });
        }
    }

    if (req.method === 'DELETE') {
        try {
            let admin = await verifyAdmin(req);
            if (admin) {
                const { productId } = req.body;
                const deletedProduct = await Product.findOneAndDelete({ productId });
                if (!deletedProduct) {
                    return res.status(404).json({ success: false, msg: "Product not found." });
                }
                return res.status(200).json({ success: true, msg: "Product Deleted!", product: deletedProduct });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, msg: "Failed to delete the product." });
        }
    }


};


function calculateSimilarityScore(product, searchQuery) {
    const productName = product.productName.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    searchQuery = searchQuery.toLowerCase(); // Convert to lowercase for case-insensitive comparison

    let score = 0;

    for (let i = 0; i < productName.length; i++) {
        const char = productName[i];
        if (searchQuery.includes(char)) {
            score++;
        }
    }
    return score;
}


export default connectDb(handler);
