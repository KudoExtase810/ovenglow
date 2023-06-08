import type { NextApiRequest, NextApiResponse } from "next";
import Order from "@/models/orders";
import dbConnect from "@/utils/dbconnect";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const order = await Order.findById(query.id);
                if (!order)
                    return res
                        .status(404)
                        .json({ message: "Order not found." });
                res.status(200).json(order);
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;

        case "DELETE":
            try {
                const order = await Order.findByIdAndDelete(query.id);
                if (!order)
                    return res
                        .status(404)
                        .json({ message: "Order not found." });
                res.status(200).json({
                    message: "Order deleted successfully.",
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        default:
            break;
    }
}
