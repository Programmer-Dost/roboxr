import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import Order from "@/models/Order";

const getUserDetails = async (req) => {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.user_access_token;

  try {
    if (!token) {
      throw new Error("Token not found");
    }

    let decoded = await jwt.verify(token, process.env.USER_JWT_SECRET);
    let user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error("User not found");
    }

    let userID = { userId: user._id };
    return { success: true, msg: "full account details", userID: userID };
  } catch (err) {
    console.error(err);
    return { success: false, msg: "User Invalid" };
  }
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
      try {
        const userDetails = await getUserDetails(req);
        console.log(userDetails.userID);
        const UserOrders = await Order.find({ userId: userDetails.userID.userId });
        
        return res.status(200).json({ success: true, Orders: UserOrders });
      } catch (e) {
      console.error(e);
      return res.status(200).json({ success: false });
    }
  }
};

export default connectDb(handler);
