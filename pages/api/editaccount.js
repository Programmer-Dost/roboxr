import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { validationResult, check } from "express-validator";

const handler = async (req, res) => {
  if (req.method === 'PUT') {
    // Assuming you use PUT to update user details
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.user_access_token;

    // Define validation rules for the fields
    const validationRules = [
      check('name')
        .isLength({ min: 2, max: 20 })
        .custom((value, { req }) => {
          const regex = /^[A-Za-z]+$/;
          if (!regex.test(value)) {
            throw new Error('Only alphabetical characters');
          }
          return true; // Validation passed
        }),
      check('phone').isNumeric().isLength({ min: 10, max: 10 }),
      check('pincode').isNumeric().isLength({ min: 6, max: 6 }),
      check('state').isLength({ min: 1 }),
      check('address').isLength({ min: 10 }),
    ];

    try {

      let decoded = await jwt.verify(token, process.env.USER_JWT_SECRET);
      let userId = await User.findOne({ _id: decoded._id });

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }


      await Promise.all(validationRules.map(rule => rule.run(req)));
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Validation failed, return validation errors
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      // Update user details based on the request body
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.phone) {
        user.phone = req.body.phone;
      }
      if (req.body.pincode) {
        user.pincode = req.body.pincode;
      }
      if (req.body.state) {
        user.state = req.body.state;
      }
      if (req.body.address) {
        user.address = req.body.address;
      }

      // Save the updated user document
      await user.save();

      // Generate a new token with the updated user ID
      // const new_token = jwt.sign({ _id: user._id }, process.env.USER_JWT_SECRET, { expiresIn: "" });

      return res.json({ success: true, msg: "Account details updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  }
};

export default connectDb(handler);
