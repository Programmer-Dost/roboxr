import argon2 from "argon2";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';
import Order from "@/models/Order";

const handler = async (req, res) => {

    if (req.method == 'POST') {
        const token = req.cookies.payment_token; // Get the token from cookies

        if (!token) {
            return res.status(401).json({ success: false, msg: "Unauthorized" });
        }

        try {
            let decoded = await jwt.verify(token, process.env.PAYMENT_JWT_SECRET);

            const order = await Order.findById(decoded._id);
            if (order) {
                await Order.updateOne({ _id: decoded._id }, { payment_status: 'Paid-Unverified' });
                console.log("Status updated to 'paid'");
                return res.setHeader('Set-Cookie', serialize('payment_token', '', {
                    expires: new Date(0),
                    path: '/',
                })).status(200).json({ success: true, orderId: order.orderID });
            } else {
                return res.status(404).json({ success: false, msg: "Invalid Payment Token" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }

    if (req.method == 'DELETE') {
        const token = req.cookies.payment_token;

        if (!token) {
            return res.status(401).json({ success: false, msg: "Unauthorized" });
        }

        try {
            let decoded = await jwt.verify(token, process.env.PAYMENT_JWT_SECRET);

            const order = await Order.findById(decoded._id);
            if (order) {
                await Order.updateOne({ _id: decoded._id }, { payment_status: 'Canceled' });
                await Order.updateOne({ _id: decoded._id }, { order_status: 'Canceled' });

                console.log("Status updated to 'paid'");
                return res.setHeader('Set-Cookie', serialize('payment_token', '', {
                    expires: new Date(0),
                    path: '/',
                })).status(200).json({ success: true, msg: "Order Canceled" });
            }

        } catch (e) {
            return res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }
}

export default handler;
