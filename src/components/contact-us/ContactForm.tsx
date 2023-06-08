import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

function ContactForm() {
    const { data: session } = useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !email || !message)
            return toast.error("Please provide the necessary details.");
        const URL = "/api/messages";
        const response = await axios.post(URL, {
            name,
            email,
            message,
        });
        response.status === 201
            ? toast.success("Your message has been successfully submitted!")
            : toast.error("Failed to submit message. Try again later!");
    };

    return (
        <section className="mx-auto w-fit" id="get-in-touch">
            <div className="mb-12 text-center">
                <h2 className="font-cormorant font-semibold text-4xl text-zinc-950 mb-4 uppercase">
                    get in touch!
                </h2>
                <p className="font-mulish text-lg text-zinc-600">
                    Have a question or simply want to leave a message? This is
                    the right place!
                </p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-[90vw] max-w-[860px] mb-10"
            >
                <div className="flex justify-between mb-4 sm:mb-8 max-sm:flex-col max-sm:gap-4">
                    <input
                        required
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                        maxLength={36}
                        placeholder="Name"
                        type="text"
                        name="name"
                        className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 sm:w-[48%] px-5 py-[18px] transition-colors duration-500 placeholder:text-zinc-700"
                    />
                    <input
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        maxLength={64}
                        placeholder="Email"
                        type="email"
                        name="email"
                        className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 sm:w-[48%] px-5 py-[18px] transition-colors duration-500 placeholder:text-zinc-700"
                    />
                </div>
                <div>
                    <textarea
                        required
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        value={message}
                        maxLength={300}
                        placeholder="Message"
                        name="message"
                        cols={30}
                        rows={15}
                        className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 w-full p-5 transition-colors duration-500 placeholder:text-zinc-700"
                    ></textarea>
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="details"
                        id="details"
                        onChange={(e) => {
                            if (e.target.checked) {
                                setName(session?.user?.name!);
                                setEmail(session?.user?.email!);
                            } else {
                                setName("");
                                setEmail("");
                            }
                        }}
                    />
                    <label
                        htmlFor="details"
                        className="font-mulish text-lg text-zinc-950 ml-2"
                    >
                        Fill my details automatically
                    </label>
                </div>
                <button
                    type="submit"
                    className="sm:block text-zinc-50 bg-zinc-900 px-12 py-4 text-sm uppercase tracking-widest w-max hover:bg-brown transition-colors duration-300 sm:mx-auto mt-6"
                >
                    submit
                </button>
            </form>
        </section>
    );
}

export default ContactForm;
