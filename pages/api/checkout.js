import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const requestBody = req.body; // { '1002': 1, '1003': 1, '1005': 1, '1018': 1 }
            const productIds = Object.keys(requestBody);
            const products = await Product.find({ productId: { $in: productIds } });

            if (products.length > 0) {
                let totalAmount = 0;
                const productList = products.map(product => {
                    const productId = product.productId;
                    const quantity = requestBody[productId];
                    const productPrice = product.productPrice;
                    const productImage = product.productImage;
                    const productName = product.productName;
                    const subtotal = quantity * productPrice;
                    totalAmount += subtotal;

                    return {
                        productId,
                        quantity,
                        productName,
                        productPrice,
                        productImage,
                        subtotal,
                    };
                });
                return res.json({ products: productList, total: totalAmount });
            } else {
                return res.status(404).json({ error: "Products not found" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ success: false, msg: "Method Not Allowed" });
    }
};

export default connectDb(handler);
