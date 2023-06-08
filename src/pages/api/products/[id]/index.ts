import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbconnect";
import Product from "@/models/products";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    const { method, query, body } = req;
    switch (method) {
        case "PUT":
            try {
                const {
                    newPrice,
                    newSalePrice,
                    newQuantity,
                    newCategory,
                    newDescription,
                } = body;
                const product = await Product.findById(query.id);
                if (!product)
                    return res
                        .status(404)
                        .json({ message: "Product not found." });
                product.price = newPrice;
                product.salePrice = newSalePrice;
                product.quantity = newQuantity;
                product.category = newCategory;
                product.description = newDescription;
                await product.save();
                res.status(200).json({
                    message: "Producted updated successfully.",
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case "PATCH":
            try {
                const { id, quantity } = query;
                const product = await Product.findByIdAndUpdate(id, {
                    quantity,
                });

                if (!product)
                    return res
                        .status(404)
                        .json({ message: "Product not found." });

                res.status(200).json({
                    message: "Quantity updated successfully.",
                });
            } catch (error: any) {
                res.status(500).json({ error: error.message });
            }
            break;
        case "DELETE":
            try {
                const { id } = query;
                const product = await Product.findByIdAndDelete(id);

                res.status(200).json({
                    message: "Product deleted successfully.",
                    deletedProduct: product,
                });
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
