import type { NextApiRequest, NextApiResponse } from "next";
import Generals from "@/models/generals";
import dbConnect from "../../../utils/dbconnect";
async function handler(req: NextApiRequest, res: NextApiResponse) {
    // CONNECT TO MONGODB
    await dbConnect();
    const { method, body } = req;
    switch (method) {
        case "GET":
            try {
                const general = await Generals.findOne({});
                res.status(200).json({ location: general.location });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case "PATCH":
            try {
                const { newLocation } = body;
                const general = await Generals.findOne({});

                general!.location = newLocation;
                await general!.save();

                res.status(200).json({
                    message: "Location updated successfully.",
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        default:
            res.status(405).json(`${method} requests are not allowed!`);
            break;
    }
}
export default handler;
