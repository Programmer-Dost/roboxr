const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {type: Number, default: ''},
    pincode : {type: Number, default: null},
    state: {type:String, default: null},
    address: {type:String, default: null},
    password: { type: String, required: true },
   
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("User", UsersSchema)