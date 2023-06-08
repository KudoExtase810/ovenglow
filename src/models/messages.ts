import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        content: { type: String, required: true, maxLength: 300 },
        isSeen: { type: Boolean, default: false },
    },
    { timestamps: true }
);
const Message =
    mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default Message;
