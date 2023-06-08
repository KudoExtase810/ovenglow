import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function Form() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    const handleCredsLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const status = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/",
        });

        status!.ok ? router.push("/") : toast.error(status!.error);
    };

    const fillAdminCreds = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setEmail("AdminUser@demo.com");
            setPassword("admindemo0");
        } else {
            setEmail("");
            setPassword("");
        }
    };

    return (
        <section className="p-3 sm:p-5 w-[590px] bg-[#E7D3A8]">
            <h1 className="font-cormorant font-semibold text-4xl text-zinc-950 mb-4">
                Welcome back
            </h1>
            <form onSubmit={handleCredsLogin}>
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
                <div className="flex items-center gap-1 font-mulish font-medium text-red-500 mb-2 text-lg">
                    <input
                        type="checkbox"
                        id="adminacc"
                        onChange={fillAdminCreds}
                    />
                    <label htmlFor="adminacc">
                        Auto-fill admin account credentials
                    </label>
                </div>
                <div className="font-mulish text-zinc-900 mb-2">
                    Don't have an account yet?{" "}
                    <Link
                        href="/register"
                        className="text-zinc-950 font-semibold hover:text-brown transition-colors"
                    >
                        Sign up here
                    </Link>
                </div>
                <button
                    type="submit"
                    className=" block text-zinc-50 bg-zinc-900 px-12 py-4 text-sm tracking-widest w-max hover:bg-brown uppercase transition-colors duration-300 mr-auto mt-3"
                >
                    log in to your account
                </button>
            </form>
        </section>
    );
}

export default Form;
