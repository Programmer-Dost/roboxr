import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";
import { serialize, parse } from 'cookie';
import Order from "@/models/Order";
import User from "@/models/User";

const handler = async (req, res) => {

    const getUserDetails = async () => {
        const cookies = parse(req.headers.cookie || "");
        const token = cookies.user_access_token;
        try {
            let decoded = await jwt.verify(token, process.env.USER_JWT_SECRET);
            let user = await User.findOne({ _id: decoded._id });
            if (user) {
                let accountDetails = { userId: user._id, name: user.name, address: [user.address, user.state, user.pincode] };
                return ({ success: true, msg: "full account details", user_details: accountDetails });
            }
        } catch (err) {
            console.log(err);
            return ({ success: false, msg: "User Invalid" });

        };
    }



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
                    const productName = product.productName;

                    const subtotal = quantity * productPrice;
                    totalAmount += subtotal;

                    return {
                        productId,
                        quantity,
                        productName,
                        productPrice,
                        subtotal,
                    };
                });
                // Create a new order document    
                const randomID = Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;
                let userDetails = await getUserDetails()

                console.log(userDetails);

                if (userDetails.user_details.address !== null && userDetails.user_details.address.toString().length >= 10) {
                    const newOrder = await new Order({
                        userId: userDetails.user_details.userId,
                        name: userDetails.user_details.name,
                        products: productList,
                        address: userDetails.user_details.address.toString(),
                        total_amount: totalAmount,
                        orderID: randomID
                    });

                    const savedOrder = await newOrder.save();

                    // Use the generated _id of the order in the JWT token
                    const token = jwt.sign({ _id: savedOrder._id }, process.env.PAYMENT_JWT_SECRET, { expiresIn: "1m" });
                    return res.status(200).setHeader('Set-Cookie', serialize('payment_token', token, {
                        httpOnly: true,
                        sameSite: "strict",
                        secure: true,
                        path: '/',
                    })).json({ success: true, products: productList, total: totalAmount });
                } else {
                    return res.status(200).json({ success: false, redirect: true, msg: "Address not found" });
                }


            } else {
                return res.status(404).json({ error: "Products not found" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    } else if (req.method === 'GET') {
        // Handle the verification of the token here
        const token = req.cookies.payment_token; // Get the token from cookies

        if (!token) {
            return res.status(401).json({ success: false, msg: "Unauthorized" });
        }

        try {
            // Decode the JWT token
            let decoded = await jwt.verify(token, process.env.PAYMENT_JWT_SECRET);

            // Check if an order with the decoded _id exists in the collection
            const order = await Order.findById(decoded._id);
            if (order) {
                return res.status(200).json({ success: true, orderId: order.orderID, totalAmount: order.total_amount });
            } else {
                return res.status(404).json({ success: false, msg: "Invalid Payment Token" });
            }
        } catch (err) {
            // console.error(err);
            return res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }
};


export default connectDb(handler);
