import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/users";
import dbConnect from "@/utils/dbconnect";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body, query } = req;
    await dbConnect();
    if (method === "GET") {
        try {
            const userStats = await User.findOne({ email: query.email }).select(
                "stats"
            );
            if (!userStats)
                res.status(404).json({ message: "Couldn't get stats." });
            res.status(200).json(userStats.stats);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else if (method === "PATCH") {
        try {
            const { statToUpdate, total } = body;
            const user = await User.findOne({ email: query.email });
            switch (statToUpdate) {
                case "totalSpent":
                    user.stats.totalSpent += total;
                    break;

                case "ordersPlaced":
                    user.stats.ordersPlaced += 1;
                    break;

                case "reviewsLeft":
                    user.stats.reviewsLeft += 1;
                    break;
                default:
                    res.status(400).json({
                        message:
                            'The stat to update must either be "totalSpent", "ordersPlaced", or "reviewsLeft".',
                    });
                    break;
            }
            await user.save();
            res.status(200).json({
                message: "User stats updated successfully!",
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({
            message: "You may only send GET requests to this endpoint!",
        });
    }
}
