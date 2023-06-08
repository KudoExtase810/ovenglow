import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/users";
import { hash } from "bcryptjs";
import dbConnect from "@/utils/dbconnect";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req;
    if (method === "POST") {
        await dbConnect();
        try {
            if (!body) {
                return res
                    .status(400)
                    .json({ message: "The request's body wasn't provided." });
            }

            const { username, email, password } = body;

            if (!username || !password || !email)
                return res
                    .status(400)
                    .json({ message: "Missing necessary data!" });

            //check for duplicates
            const usernameDup = await User.exists({ username });
            const emailDup = await User.exists({ email });
            if (usernameDup || emailDup)
                return res
                    .status(422)
                    .json({ message: "This user already exists!" });

            //hasing the password and creating the user
            const hashedPassword = await hash(password, 12);
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
            });
            res.status(201).json({
                message: "A new account has been successfully created.",
                user: newUser,
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({
            message: "You may only POST to this endpoint!",
        });
    }
}
