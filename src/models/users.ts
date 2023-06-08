import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String },
    stats: {
        totalSpent: { type: Number, default: 0 },
        ordersPlaced: { type: Number, default: 0 },
        reviewsLeft: { type: Number, default: 0 },
    },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
