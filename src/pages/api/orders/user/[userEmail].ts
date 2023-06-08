import type { NextApiRequest, NextApiResponse } from "next";
import Order from "@/models/orders";
import dbConnect from "@/utils/dbconnect";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;
    if (method === "GET") {
        await dbConnect();
        try {
            const userOrders = await Order.where("customer.email").equals(
                query.userEmail
            );
            res.status(200).json(userOrders);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({
            message: "You may only send GET requests to this endpoint.",
        });
    }
}
