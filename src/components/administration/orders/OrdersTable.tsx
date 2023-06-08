import React from "react";
import SingleOrder from "./SingleOrder";
import { useOrders } from "@/context/OrdersContext";

function OrdersTable() {
    const { orders } = useOrders();

    return (
        <div className="relative overflow-x-auto mb-6">
            <table className="w-full text-left text-gray-700 font-mulish">
                <thead className="text-sm uppercase bg-gray-300 font-semibold">
                    <tr>
                        <th scope="col" className="px-6 max-sm:px-3 py-3">
                            Order ID
                        </th>
                        <th scope="col" className="px-6 max-sm:px-3 py-3">
                            Items
                        </th>
                        <th scope="col" className="px-6 max-sm:px-3 py-3">
                            Total
                        </th>
                        <th scope="col" className="px-6 max-sm:px-3 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="text-lg">
                    {orders!.map((order) => (
                        <SingleOrder order={order} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrdersTable;
