import Order from "@/models/orders";
import dbConnect from "@/utils/dbconnect";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;
    if (method === "PATCH") {
        await dbConnect();
        try {
            const order = await Order.findByIdAndUpdate(query.id, {
                isSeen: true,
            });
            if (!order) res.status(404).json({ message: "Order not found." });
            res.status(200).json({
                message: "Message updated successfully.",
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({
            message: "Only PATCH requests may be sent to this endpoint.",
        });
    }
}
