import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/users";
import dbConnect from "@/utils/dbconnect";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query, body } = req;
    if (method === "GET") {
        await dbConnect();
        const userPhone = await User.findOne({ email: query.email }).select(
            "phone"
        );
        if (!userPhone)
            return res.status(404).json({ message: "User does not exist." });
        res.status(200).json(userPhone);
    } else if (method === "PATCH") {
        await dbConnect();
        const user = await User.findOne({ email: query.email });
        if (!user)
            return res.status(404).json({ message: "User does not exist." });
        const { newPhone } = body;
        user.phone = newPhone;
        await user.save();
        res.status(200).json({
            message: "User's details updated successfully.",
        });
    } else {
        res.status(405).json({
            message: "You may only send GET requests to this endpoint!",
        });
    }
}
