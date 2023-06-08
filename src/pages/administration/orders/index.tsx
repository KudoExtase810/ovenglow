import FullOrder from "@/components/administration/orders/FullOrder";
import OrdersTable from "@/components/administration/orders/OrdersTable";
import { useOrders } from "@/context/OrdersContext";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

function index() {
    const { orders, showFullOrder } = useOrders();

    // full message modal
    useEffect(() => {
        if (showFullOrder) {
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.body.classList.remove("overflow-y-hidden");
        }
    }, [showFullOrder]);

    if (!orders) return null;
    if (!orders.length) {
        return (
            <>
                <h2 className="text-2xl font-cormorant py-6 w-4/5 border border-zinc-300 mx-auto text-center font-semibold mt-32 uppercase">
                    there are no roders to show.
                </h2>
                <Link
                    className="block text-zinc-50 bg-zinc-900 px-12 py-4 text-sm tracking-widest w-max hover:bg-brown transition-colors duration-300 mr-auto mt-12 mb-32 mx-auto uppercase"
                    href="/"
                >
                    return to home
                </Link>
            </>
        );
    }
    return (
        <>
            {showFullOrder && <FullOrder />}
            <div className="mx-8">
                <h2 className="font-cormorant uppercase text-3xl font-bold py-4">
                    all orders
                </h2>
                <OrdersTable />
            </div>
        </>
    );
}
export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const session = await getSession(context.res);
    if (!session?.user.isAdmin) {
        throw new Error("You don't have permission to access this page!");
    }

    return {
        props: {},
    };
};
export default index;
