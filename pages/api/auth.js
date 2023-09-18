// import argon2 from "argon2";
// import User from "@/models/User";
// import connectDb from "@/middleware/mongoose";
// import jwt from "jsonwebtoken";
// import { parse } from "cookie";
// import { serialize } from 'cookie';

// const handler = async (req, res) => {

//     if (req.method == 'GET') {

//         const cookies = parse(req.headers.cookie || "");
//         const token = cookies.access_token;


//         try {


//             let decoded = await jwt.verify(token, 'secret');
//             let user = await User.findOne({ _id: decoded._id });

//             if (!user) {
//                 return res.status(400).json({ success: false, msg: "User Not Found" });
//             }


//             if (user) {
//                 decoded = { name: user.name, email: user.email };
//                 if (req.query.fulldetails === 'true') {
//                     let accountDetails = { name: user.name, email: user.email, phone: user.phone, pincode: user.pincode, state: user.state, address: user.address };
//                     return res.status(200).json({ success: true, msg: "full account details", user_details: accountDetails });
//                 } else {
//                     return res.status(200).json({ success: true, msg: "send", user_details: decoded });
//                 }

//             }




//         } catch (err) {
//             //console.log(err);
//             return res.status(400).json({ success: false, msg: "User Invalid" });

//         };
//     }
// }

// export default connectDb(handler);



import argon2 from "argon2";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { serialize } from 'cookie';

const handler = async (req, res) => {
  if (req.method == 'GET') {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.user_access_token;

    try {
      let decoded = await jwt.verify(token, process.env.USER_JWT_SECRET);
      let user = await User.findOne({ _id: decoded._id });

      if (!user) {
        return res.status(400).json({ success: false, msg: "User Not Found" });
      }

      // Now that we have a user, continue processing
      if (req.query.fulldetails === 'true') {
        let accountDetails = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          pincode: user.pincode,
          state: user.state,
          address: user.address
        };
        return res.status(200).json({ success: true, msg: "full account details", user_details: accountDetails });
      } else {
        let decoded = {
          name: user.name,
          email: user.email
        };
        return res.status(200).json({ success: true, msg: "send", user_details: decoded });
      }
    } catch (err) {
      // Handle token verification errors
      return res.status(400).json({ success: false, msg: "User Invalid" });
    }
  }
}

export default connectDb(handler);
