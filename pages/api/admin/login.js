import argon2 from "argon2";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';
import rateLimit from "express-rate-limit";


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Allow a maximum of 5 requests per IP within the 15-minute window
});

const handler = async (req, res) => {

    if (req.method == 'POST') {
        try {
            if (req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD ) {
                const token = jwt.sign({ _id: process.env.ADMIN_ID }, process.env.ADMIN_JWT_SECRET, { expiresIn: "2h" });
                return res.setHeader('Set-Cookie', serialize('admin_access_token', token, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: true,
                    path: '/',
                }))
                    .json({ success: true, msg: "Login Successful" });
            } else {
                return res.status(400).json({ success: false, msg: "Wrong Credentials" })
            }
        } catch (er) {
            return res.status(500).json({ success: false, msg: "Login unsuccessful" })
        }

    }
}

export default connectDb(handler);
