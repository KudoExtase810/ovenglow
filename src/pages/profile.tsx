import Details from "@/components/profile/Details";
import OrderHistory from "@/components/profile/OrderHistory";
import axios from "axios";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "next-auth/react";
import Stats from "@/components/profile/Stats";
import { useState } from "react";
import { toast } from "react-toastify";
import type { Session } from "next-auth";

interface props {
    userOrders: order[];
    phone: string;
    session: Session | null;
}

function profile({ userOrders, phone, session }: props) {
    const [phoneNum, setPhoneNum] = useState(phone);
    // Check whether there's a change in the values to show the save button accordingly
    function isChanged() {
        if (phoneNum !== phone) return true;
        else return false;
    }
    const handleSave = async () => {
        const URL = `/api/users/${session?.user?.email}`;
        const res = await axios.patch(URL, {
            newPhone: phoneNum,
        });
        if (res.status === 200) {
            toast.success("Your details have been updated successfully.");
        } else {
            toast.error("Failed to save changes. Try again later.");
        }
    };
    const handleCancel = () => {
        setPhoneNum(phone);
    };

    return (
        <div className="mx-6">
            <header className="font-mulish text-zinc-900 mt-9 mb-6 flex items-center justify-between max-lg:flex-col max-lg:gap-5 max-lg:border-b max-lg:border-gray-600 max-lg:py-4">
                <div className="flex gap-3 items-center max-lg:flex-col max-lg:text-center">
                    <FaUserCircle size={164} className="hover:text-brown" />
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl font-bold tracking-wide">
                            {session?.user?.name}
                        </span>
                        <span className="font-mulish text-lg text-gray-700 font-medium">
                            {session?.user?.email}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => signOut()}
                    aria-label="confirm delete"
                    type="button"
                    className="text-zinc-50 uppercase bg-red-500 px-12 py-4 text-sm tracking-widest hover:bg-red-600 transition-colors duration-300 max-lg:px-16"
                >
                    sign out
                </button>
            </header>
            <div className="font-mulish pb-6 border-b flex justify-between max-lg:flex-col max-lg:gap-4">
                <div className="text-lg text-zinc-900 font-medium">
                    <h2 className="text-2xl font-bold tracking-wide">
                        Your profile
                    </h2>
                    <p className="text-gray-700">
                        View your details, keep track of your actions and edit
                        your info.
                    </p>
                </div>
                {isChanged() && (
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handleCancel}
                            className="bg-zinc-300 text-zinc-900 p-4 text-sm uppercase tracking-widest hover:bg-brown transition-colors duration-300"
                        >
                            cancel
                        </button>
                        <button
                            onClick={handleSave}
                            type="button"
                            className="text-zinc-50 bg-zinc-900 px-8 py-4 text-sm uppercase tracking-widest hover:bg-brown transition-colors duration-300"
                        >
                            save changes
                        </button>
                    </div>
                )}
            </div>
            <Details
                phone={phone}
                phoneNum={phoneNum}
                setPhoneNum={setPhoneNum}
            />
            <OrderHistory orders={userOrders} />
            <Stats />
        </div>
    );
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const session = await getSession(context.res);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };
    }

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const email = session!.user?.email;

    const orderRes = await axios.get(`${BASE_URL}/api/orders/user/${email}`); //!
    const phoneRes = await axios.get(`${BASE_URL}/api/users/${email}`); //!

    return {
        props: {
            session,
            userOrders: orderRes.data,
            phone: phoneRes.data.phone || null,
        },
    };
};

export default profile;
