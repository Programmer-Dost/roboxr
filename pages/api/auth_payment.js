// import argon2 from "argon2";
// import User from "@/models/User";
// import connectDb from "@/middleware/mongoose";
// import jwt from "jsonwebtoken";
// import { parse } from "cookie";

// const handler = async (req, res) => {

//     if (req.method == 'GET') {

//         const cookies = parse(req.headers.cookie || "");
//         const token = cookies.payment_token;


//         try {
//             let decoded = await jwt.verify(token, 'secret');
//             console.log(decoded);
//             let user = (decoded._id === 909009900)

//             if (user) {
//                     return res.status(200).json({ success: true, msg: "send" });
//                 }else{
//                 return res.status(200).json({ success: false, msg: "send" });
//             }

//         } catch (err) {
//             // console.log(err);
//             return res.status(400).json({ success: false, msg: " Invalid" });

//         };
//     }
// }

// export default connectDb(handler);