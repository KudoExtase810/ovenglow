import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbconnect";
import Product from "@/models/products";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    const { method, body } = req;

    switch (method) {
        case "GET":
            try {
                const products = await Product.find({});
                res.status(200).json(products);
            } catch (error: any) {
                res.status(500).json({
                    error: error.message,
                });
            }

            break;
        case "POST":
            try {
                const newProduct = await Product.create(body as product);

                res.status(201).json({ newProduct });
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
