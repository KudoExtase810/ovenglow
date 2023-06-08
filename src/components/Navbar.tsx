import Link from "next/link";
import { GiBasket } from "react-icons/gi";
import { ImLocation } from "react-icons/im";
import { FiMenu } from "react-icons/fi";
import { RiTimeFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useMessages } from "@/context/MessageContext";
import axios from "axios";
import { useOrders } from "@/context/OrdersContext";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function Navbar() {
    const router = useRouter();
    const { pathname } = router;

    const { cartItems } = useCart();

    // Check whether a msg hasn't been read yet.
    const { allMessages, setAllMessages } = useMessages();
    useEffect(() => {
        const getMessages = async () => {
            const res = await axios.get("/api/messages");
            setAllMessages(res.data);
        };
        getMessages();
    }, []);
    function unseenMsgExists() {
        return allMessages?.some((msg) => !msg.isSeen);
    }

    // Check whether an order hasn't been seen yet
    const { orders, setOrders } = useOrders();
    useEffect(() => {
        const getOrders = async () => {
            const res = await axios.get("/api/orders");
            setOrders(res.data);
        };
        getOrders();
    }, []);
    function unseenOrderExists() {
        return orders?.some((order) => !order.isSeen);
    }

    const { data: session } = useSession();

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        setShowMenu(false);
    }, [pathname]);

    const excludedPaths = ["login", "register"];
    if (excludedPaths.some((path) => pathname.includes(path))) return null;

    return (
        <nav className="flex flex-col max-lg:p-6 max-sm:px-4 max-sm:py-5 max-lg:border-b max-lg:border-zinc-200">
            {/* top level navbar */}
            <div className="bg-white flex justify-around items-center lg:py-14 max-lg:justify-between">
                <div className="flex gap-5 items-center max-lg:hidden">
                    <Link href="/contact-us">
                        <ImLocation
                            size={40}
                            className="text-gray-700 hover:text-gray-400 transition duration-500 "
                        />
                    </Link>
                    <button
                        type="button"
                        onClick={() => toast.info("Comming soon!")}
                    >
                        <RiTimeFill
                            size={40}
                            className="text-gray-700 hover:text-gray-400 transition duration-500"
                        />
                    </button>
                </div>
                <div>
                    <Link href="/" className="text-center uppercase">
                        <span className="block font-cormorant text-6xl max-sm:text-4xl font-semibold text-zinc-900 tracking-wide lg:mb-1">
                            <span className="text-gray-700">o</span>ven
                            <span className="text-gray-700">g</span>low
                        </span>
                        <span className="block font-mulish tracking-widest text-zinc-600 max-lg:hidden">
                            from our oven to you
                        </span>
                    </Link>
                </div>
                <div className="flex gap-5 items-center max-lg:gap-4">
                    <Link href="/profile" className="max-lg:hidden">
                        <FaUser
                            size={40}
                            className="text-gray-700 hover:text-gray-400 transition duration-500 mt-1"
                        />
                    </Link>
                    <button
                        type="button"
                        className="hidden"
                        onClick={() => toast.info("Comming soon!")}
                    >
                        <RiTimeFill
                            size={40}
                            className="text-gray-700 hover:text-gray-400 transition duration-500"
                        />
                    </button>
                    <div className="relative">
                        <Link href="/cart">
                            <GiBasket
                                size={40}
                                className="text-gray-700 hover:text-gray-400 transition duration-500"
                            />
                            {
                                <span className="h-[24px] w-[24px] rounded-full bg-zinc-900 text-white absolute flex justify-center items-center font-mulish text-sm -top-2 -right-2">
                                    {cartItems.length}
                                </span>
                            }
                        </Link>
                    </div>
                    <button
                        onClick={() => setShowMenu(true)}
                        className="lg:hidden relative"
                    >
                        <FiMenu
                            size={40}
                            className="text-gray-700 hover:text-gray-400 transition duration-500"
                        />
                        {(unseenMsgExists() || unseenOrderExists()) && (
                            <span className="h-[11px] w-[11px] rounded-full bg-green-500 absolute flex justify-center items-center -top-1 -right-2"></span>
                        )}
                    </button>
                </div>
            </div>
            {/* Second navbar */}
            <div
                className={`px-8 max-lg:flex max-lg:items-center max-lg:px-20 max-lg:h-full max-lg:fixed max-lg:top-0 right-0 ${
                    showMenu
                        ? "opacity-100"
                        : "max-lg:opacity-0 max-lg:translate-x-full"
                } max-lg:bg-white max-lg:z-[50] max-lg:border max-lg:border-gray-300 transition-all duration-300 ease-in`}
            >
                <button
                    className="absolute top-4 right-4 lg:hidden"
                    onClick={() => setShowMenu(false)}
                >
                    <CgClose
                        size={40}
                        className="text-gray-700 hover:text-gray-400 transition duration-500"
                    />
                </button>
                {!pathname.includes("/administration") ? (
                    <ul className="font-cormorant flex gap-8 text-zinc-950 font-bold text-lg justify-center lg:py-10 lg:border-y lg:border-zinc-200 max-lg:flex-col">
                        <li
                            className={` hover:text-brown transition duration-500 uppercase max-lg:border-b max-lg:border-gray-300 max-lg:pt-2 max-lg:pb-5 ${
                                pathname === "/" && "text-brown"
                            }`}
                        >
                            <Link href="/">home</Link>
                        </li>

                        <li
                            className={` hover:text-brown transition duration-500 uppercase max-lg:border-b max-lg:border-gray-300 max-lg:pt-2 max-lg:pb-5 ${
                                pathname === "/shop" && "text-brown"
                            }`}
                        >
                            <Link href="/shop">products</Link>
                        </li>
                        <li
                            className={` hover:text-brown transition duration-500 uppercase max-lg:border-b max-lg:border-gray-300 max-lg:pt-2 max-lg:pb-5 ${
                                pathname === "/profile" && "text-brown"
                            } lg:hidden`}
                        >
                            <Link href="/profile">profile</Link>
                        </li>

                        <li
                            className={` hover:text-brown transition duration-500 uppercase max-lg:border-b max-lg:border-gray-300 max-lg:pt-2 max-lg:pb-5 ${
                                pathname === "/contact-us" && "text-brown"
                            }`}
                        >
                            <Link href="/contact-us#get-in-touch">
                                contact us
                            </Link>
                        </li>
                        {session?.user.isAdmin && (
                            <li
                                className={` hover:text-brown transition duration-500 uppercase max-lg:border-b max-lg:border-gray-300 max-lg:pt-2 max-lg:pb-5`}
                            >
                                <Link href="/administration/general">
                                    <div className="relative">
                                        <span>administration</span>
                                        {(unseenMsgExists() ||
                                            unseenOrderExists()) && (
                                            <span className="h-[11px] w-[11px] rounded-full bg-green-500 absolute flex justify-center items-center -top-1 -right-3"></span>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        )}
                    </ul>
                ) : (
                    // Administration navbar
                    <ul className="font-cormorant flex gap-8 text-zinc-950 font-bold text-lg justify-center lg:py-10 lg:border-y lg:border-zinc-200 max-lg:flex-col">
                        <li
                            className={` hover:text-brown transition duration-500 uppercase max-lg:border-b max-lg:border-gray-300 max-lg:pt-2 max-lg:pb-5 `}
                        >
                            <Link href="/">home</Link>
                        </li>
                        <li
                            className={` hover:text-brown transition duration-500 uppercase max-lg:border-b max-lg:border-gray-300 max-lg:pt-2 max-lg:pb-5 ${
                                pathname === "/administration/general" &&
                                "text-brown"
                            }`}
                        >
                            <Link href="/administration/general">general</Link>
                        </li>

                        <li
                            className={` hover:text-brown transition duration-500 uppercase max-lg:border-b max-lg:border-gray-300 max-lg:pt-2 max-lg:pb-5 ${
                                pathname === "/administration/products" &&
                                "text-brown"
                            }`}
                        >
                            <Link href="/administration/products">
                                products
                            </Link>
                        </li>
                        <li
                            className={` hover:text-brown transition duration-500 uppercase max-lg:border-b max-lg:border-gray-300 max-lg:pt-2 max-lg:pb-5 ${
                                pathname === "/administration/orders" &&
                                "text-brown"
                            }`}
                        >
                            <Link href="/administration/orders">
                                <div className="relative">
                                    <span>orders</span>
                                    {unseenOrderExists() && (
                                        <span className="h-[11px] w-[11px] rounded-full bg-green-500 absolute flex justify-center items-center -top-1 -right-3"></span>
                                    )}
                                </div>
                            </Link>
                        </li>
                        <li
                            className={` hover:text-brown transition duration-500 uppercase max-lg:border-b max-lg:border-gray-300 max-lg:pt-2 max-lg:pb-5 ${
                                pathname === "/administration/messages" &&
                                "text-brown"
                            }`}
                        >
                            <Link href="/administration/messages">
                                <div className="relative">
                                    <span>messages</span>
                                    {unseenMsgExists() && (
                                        <span className="h-[11px] w-[11px] rounded-full bg-green-500 absolute flex justify-center items-center -top-1 -right-3"></span>
                                    )}
                                </div>
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
