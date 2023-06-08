import type { NextApiRequest, NextApiResponse } from "next";
import Order from "@/models/orders";
import dbConnect from "@/utils/dbconnect";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const orders = await Order.find({});
                res.status(200).json(orders);
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case "POST":
            try {
                const newOrder = await Order.create(body);
                res.status(201).json({ newOrder });
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
