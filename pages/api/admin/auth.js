
import argon2 from "argon2";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { serialize } from 'cookie';

const handler = async (req, res) => {
    if (req.method == 'GET') {
        const cookies = parse(req.headers.cookie || "");
        const token = cookies.admin_access_token;

        try {
            let decoded = await jwt.verify(token, process.env.ADMIN_JWT_SECRET);
            let user = (decoded._id === process.env.ADMIN_ID)
            if (!user) {
                return res.status(400).json({ success: false, msg: "User Not Found" });
            }

            return res.status(200).json({ success: true, msg: "Success" });
        } catch (err) {
            return res.status(400).json({ success: false, msg: "User Invalid" });
        }
    }
}

export default connectDb(handler);
