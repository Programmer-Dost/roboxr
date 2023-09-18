const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    products: [{
        productId: { type: String },
        productName: { type: String },
        quantity: { type: Number, default: 1 },
    }],
    orderID: { type: String, required: true },
    address: { type: String, required: true },
    total_amount: { type: Number, required: true },
    payment_status: { type: String, required: true, default: 'Pending' },
    order_status: { type: String, required: true, default: 'Pending' },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Order", OrderSchema)