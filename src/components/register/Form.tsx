import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function Form() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const URL = "/api/auth/register";
        const response = await axios.post(URL, {
            username,
            email,
            password,
        });
        switch (response.status) {
            case 201:
                toast.success("Your account was successfully created.");
                router.push("/login");
                break;
            case 422:
                toast.error(
                    "An account with the same email/username already exists!"
                );
                break;
            default:
                toast.error(
                    "Failed to create a new account. Please try again later."
                );
                break;
        }
    };

    return (
        <section className="p-3 sm:p-5 w-[590px] bg-[#E7D3A8]">
            <h1 className="font-cormorant font-semibold text-4xl text-zinc-950 mb-4">
                Create your Account
            </h1>
            <form className="" onSubmit={handleRegister}>
                <div className="my-4 font-mulish text-zinc-900">
                    <label htmlFor="email">Email</label>
                    <input
                        minLength={6}
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="user@email.com"
                        className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 p-3 transition-colors duration-500 placeholder:text-zinc-700 w-full mt-2"
                    />
                </div>
                <div className="my-4 font-mulish text-zinc-900">
                    <label htmlFor="email">Username</label>
                    <input
                        minLength={6}
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        placeholder="John Doe"
                        className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 p-3 transition-colors duration-500 placeholder:text-zinc-700 w-full mt-2"
                    />
                </div>
                <div className="my-4 font-mulish text-zinc-900">
                    <label htmlFor="password">Password</label>
                    <input
                        minLength={6}
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="••••••••"
                        type="password"
                        className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 p-3 transition-colors duration-500 placeholder:text-zinc-600 w-full mt-2"
                    />
                </div>
                <div className="font-mulish text-zinc-900 mb-2">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-zinc-950 font-semibold hover:text-brown transition-colors"
                    >
                        Sign in here
                    </Link>
                </div>
                <button
                    type="submit"
                    className=" block text-zinc-50 bg-zinc-900 px-12 py-4 text-sm tracking-widest w-max uppercase hover:bg-brown transition-colors duration-300 mr-auto mt-3"
                >
                    create an account
                </button>
            </form>
        </section>
    );
}

export default Form;
