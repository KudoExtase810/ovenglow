import Message from "@/models/messages";
import dbConnect from "@/utils/dbconnect";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const messages = await Message.find({});
                if (!messages)
                    return res
                        .status(404)
                        .json({ message: "No messages were found." });
                res.status(200).json(messages);
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case "POST":
            try {
                const { name, email, message } = body;
                await Message.create({
                    username: name,
                    email,
                    content: message,
                });
                res.status(201).json({
                    message: "Message successfully created.",
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case "PATCH":
            try {
                await Message.updateMany({}, { isSeen: true });
                res.status(200).json({
                    message: "All messages were marked as read.",
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case "DELETE":
            try {
                await Message.deleteMany({});
                res.status(200).json({
                    message: "All messages were successfully deleted.",
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.status(405).json({
                message: `${method} requests are not allowed!`,
            });
            break;
    }
}
