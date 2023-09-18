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



    if (req.method === 'GET') {
        try {
            let admin = await verifyAdmin(req);
            if (admin) {
                const Orders = await Order.find({ payment_status: { $ne: "Canceled" } });
                return res.status(200).json({ success: true, Orders: Orders });
            } else {
                return res.status(400).json({ success: false, msg: "Admin Not verified" });
            }
        } catch (e) {
            console.error(e);
            return res.status(200).json({ success: false });
        }
    }
    if (req.method === 'PUT') {
        try {
            let admin = await verifyAdmin(req);
            if (admin) {
                const orderId = req.body.orderId;
                const paymentStatus = req.body.payment_status;
                const orderStatus = req.body.order_status;
                if (orderStatus) {
                    const updatedOrder = await Order.findOneAndUpdate(
                        { orderID: orderId }, // Use the appropriate field name for your orderId
                        { order_status: orderStatus },
                        { new: true }
                    );
                    if (updatedOrder) {
                        return res.status(200).json({ success: true, updatedOrder, msg: "Updated" });
                    } else {
                        return res.status(404).json({ success: false, msg: 'Order not found' });
                    }
                }
                if (paymentStatus) {
                    const updatedOrder = await Order.findOneAndUpdate(
                        { orderID: orderId },
                        { payment_status: paymentStatus },
                        { new: true }
                    );
                    if (updatedOrder) {
                        return res.status(200).json({ success: true, updatedOrder, msg: "Updated" });
                    } else {
                        return res.status(404).json({ success: false, msg: 'Order not found' });
                    }
                }
            }
        } catch (e) {
            console.error(e);
            return res.status(400).json({ success: false, msg: 'Error' });
        }
    }
};

export default connectDb(handler);
