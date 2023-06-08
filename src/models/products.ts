import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String] },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    description: { type: String },
    image: { type: String, required: true },
    reviews: [
        {
            rating: { type: Number, enum: [1, 2, 3, 4, 5] },
            reviewText: { type: String },
            user: { type: String },
            createdAt: { type: String },
        },
    ],
    quantity: { type: Number },
    amountInCart: { type: Number, default: 1, min: 0 },
});

const Product =
    mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
