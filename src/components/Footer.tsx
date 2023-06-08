import { ImFacebook2 } from "react-icons/im";
import { BsInstagram, BsPinterest } from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
function Footer() {
    const { pathname } = useRouter();
    const [phone, setPhone] = useState("");

    const date = new Date();

    useEffect(() => {
        const getPhone = async () => {
            const res = await axios.get("/api/general/phone");
            res.status === 200 && setPhone(res.data.storePhone as string);
        };
        getPhone();
    }, []);

    const excludedPaths = [
        "administration",
        "profile",
        "products",
        "404",
        "login",
        "register",
    ];
    if (excludedPaths.some((path) => pathname.includes(path))) return null;
    return (
        <footer className="relative text-zinc-50 bg-zinc-900 pb-12 pt-16 font-mulish">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-3xl font-bold mb-5 font-cormorant">
                            Let's keep in touch!{" "}
                        </h4>
                        <h5 className="text-lg mt-0 mb-2 max-w-[305px]">
                            Just like a perfectly baked pastry, we created
                            Ovenglow with special love and it shows.
                        </h5>
                        <div className="mt-6 lg:mb-0 mb-6 font-mulish uppercase text-sm flex flex-col gap-3 sm:flex-row">
                            <a
                                target="_blank"
                                href="https://facebook.com"
                                className="flex gap-2 hover:text-blue-700 transition-colors duration-300"
                            >
                                <ImFacebook2 size={20} />
                                <span>Facebook</span>
                            </a>

                            <a
                                target="_blank"
                                href="https://instagram.com"
                                className="flex gap-2 hover:text-fuchsia-500 transition-colors duration-300"
                            >
                                <BsInstagram size={20} />
                                <span>Instagram</span>
                            </a>

                            <a
                                target="_blank"
                                href="https://pinterest.com"
                                className="flex gap-2 hover:text-red-600 transition-colors duration-300"
                            >
                                <BsPinterest size={20} />
                                <span>Pinterest</span>
                            </a>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 lg:px-4">
                        <div className="flex flex-wrap items-top mb-6">
                            <div className="w-full lg:w-4/12 px-4 ml-auto">
                                <span className="block uppercase text-xl font-bold mb-2 font-cormorant">
                                    Useful Links
                                </span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a
                                            className="font-semibold block pb-2 text-sm"
                                            href=""
                                        >
                                            About Us
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className=" font-semibold block pb-2 text-sm uppercase"
                                            href={`tel:${phone}`}
                                        >
                                            call us {phone}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <span className="block uppercase text-xl font-bold mb-2 font-cormorant">
                                    Other Resources
                                </span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a
                                            className="font-semibold block pb-2 text-sm"
                                            href=""
                                        >
                                            Terms & Conditions
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="font-semibold block pb-2 text-sm"
                                            href=""
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="font-semibold block pb-2 text-sm"
                                            href=""
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 " />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm font-semibold py-1">
                            Copyright ©{" "}
                            <span id="get-current-year">
                                {" ● " + date.getFullYear() + " ● "}
                            </span>
                            <a href="" className="hover:text-brown">
                                Alaa Kudo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
