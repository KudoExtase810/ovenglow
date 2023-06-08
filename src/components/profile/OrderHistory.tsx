import { useEffect, useState } from "react";
import Order from "./Order";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
interface props {
    orders: order[];
}
function OrderHistory({ orders }: props) {
    const compareOrdersByStatus = (a: order, b: order) => {
        const orderStatusOrder = [
            "Ordered",
            "Preparing",
            "Ready",
            "On the way",
            "Delivered",
        ];
        const statusA = orderStatusOrder.indexOf(a.status);
        const statusB = orderStatusOrder.indexOf(b.status);
        return statusA - statusB;
    };

    const [sortedOrders, setSortedOrders] = useState<order[]>([]);

    useEffect(() => {
        setSortedOrders([...orders].sort(compareOrdersByStatus));
    }, [orders]);

    const handleOrderByStatus = () => {
        setSortedOrders([...sortedOrders].reverse());
    };
    return (
        <section className="font-mulish text-lg text-zinc-900 font-medium mt-6 pb-2 border-b">
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-wide">
                    Order history
                </h2>
                <p className="text-gray-700">
                    See what you've ordered in the past.
                </p>
            </div>
            {orders.length ? (
                // thead height = 44px | tbody > tr height 60px --> 60*5 + 44 = 344px
                <div className="relative overflow-auto mb-6 max-h-[344px]">
                    <table className="w-full text-left text-gray-700 font-mulish">
                        <thead className="text-sm uppercase bg-gray-300 font-semibold">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 max-sm:px-3 py-3"
                                >
                                    Order ID
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 max-sm:px-3 py-3"
                                >
                                    Items
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 max-sm:px-3 py-3"
                                >
                                    Total
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 max-sm:px-3 py-3 cursor-pointer"
                                >
                                    <button
                                        className="flex items-center gap-1"
                                        onClick={handleOrderByStatus}
                                    >
                                        <span className="uppercase">
                                            Status
                                        </span>
                                        <div>
                                            <GoTriangleUp className="-mb-1" />
                                            <GoTriangleDown className="-mt-1" />
                                        </div>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-lg">
                            {sortedOrders.map((order) => (
                                <Order order={order} key={order._id} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-2xl text-red-500 mb-6">
                    You haven't made any orders yet, you should see them here
                    once you have.
                </div>
            )}
        </section>
    );
}

export default OrderHistory;
