import type { NextApiRequest, NextApiResponse } from "next";
import General from "@/models/generals";
import dbConnect from "@/utils/dbconnect";
async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const general = await General.findOne({});
                const { storePhone } = general!;
                res.status(200).json({ storePhone });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case "PATCH":
            try {
                const { phoneNumber } = body;
                const general = await General.findOne({});
                general!.storePhone = phoneNumber;
                await general!.save();
                res.status(200).json("Phone number updated successfully.");
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
