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
                res.status(200).json({ categories: general.categories });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case "PATCH":
            try {
                const { newCategory } = body;
                const general = await Generals.findOne({});
                const currentCategories = general.categories;
                if (currentCategories.includes(newCategory)) {
                    return res
                        .status(422)
                        .json({ message: "This category already exists!" });
                }
                general.categories = [...currentCategories, newCategory];
                await general!.save();
                res.status(201).json({
                    message: "A new category has been added.",
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
