import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
    {
        customer: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String },
        },
        total: { type: Number, required: true },
        orderedProducts: {
            type: [
                {
                    name: { type: String, required: true },
                    quantity: { type: Number, required: true },
                    price: { type: Number, required: true },
                    image: { type: String },
                },
            ],
        },
        isSeen: { type: Boolean, default: false },
        shouldDeliver: { type: Boolean },
        isPaid: { type: Boolean },
        status: {
            type: String,
            enum: ["Ordered", "Preparing", "Ready", "On the way", "Delivered"],
            default: "Ordered",
        },
    },
    { timestamps: true }
);
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
