import Message from "@/models/messages";
import dbConnect from "@/utils/dbconnect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;

    await dbConnect();

    switch (method) {
        case "GET": {
            try {
                const { id } = query;
                const message = await Message.findById(id);
                if (!message) {
                    return res
                        .status(404)
                        .json({ error: "Message not found." });
                }
                res.status(200).json({ message });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        }
        case "PATCH": {
            try {
                const message = await Message.findByIdAndUpdate(query.id, {
                    isSeen: true,
                });
                if (!message) {
                    return res
                        .status(404)
                        .json({ message: "Message not found." });
                }
                res.status(200).json({
                    message: "Message was marked as read.",
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        }
        case "DELETE": {
            try {
                const deletedMsg = await Message.findByIdAndDelete(query.id);
                if (!deletedMsg) {
                    return res
                        .status(404)
                        .json({ message: "Message not found." });
                }
                res.status(200).json({
                    message: "Message deleted successfully.",
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        }

        default: {
            res.status(405).json({
                message: "You may only send GET requests to this endpoint.",
            });
            break;
        }
    }
}
