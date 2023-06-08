import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbconnect";
import Product from "@/models/products";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query, body } = req;

    if (method === "PATCH") {
        await dbConnect();
        try {
            const { quantityBought } = body;
            const product = await Product.findById(query.id);
            if (!product)
                return res.status(404).json({ message: "Product not found." });
            product.quantity -= quantityBought;
            await product.save();
            res.status(200).json({ message: "Quantity updated successfully." });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({
            message: "You may only send PATCH requests to this endpoint.",
        });
    }
}
