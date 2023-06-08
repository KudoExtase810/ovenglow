import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/utils/dbconnect";
import User from "@/models/users";
import { compare } from "bcryptjs";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: any, req) {
                await dbConnect();
                //check user existance
                const result = await User.findOne({
                    email: credentials!.email,
                });
                if (!result) throw new Error("This account doesn't exist!");

                //compare passwords
                const comparePasswords = await compare(
                    credentials!.password,
                    result.password
                );
                if (!comparePasswords || result.email !== credentials!.email) {
                    throw new Error("Invalid credentials!");
                }

                return result;
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
    },

    callbacks: {
        async session({ token, session }: any) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.isAdmin = token.isAdmin;
            }

            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await User.findOne({
                email: token.email,
            });
            if (!dbUser) {
                return token;
            }

            return {
                id: dbUser._id,
                name: dbUser.username,
                email: dbUser.email,
                isAdmin: dbUser.isAdmin,
            };
        },
    },
});
