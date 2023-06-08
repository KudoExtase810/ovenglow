import { useOrders } from "@/context/OrdersContext";
import getColoredStatus from "@/utils/getColoredStatus";
import axios from "axios";

interface props {
    order: order;
}

function SingleOrder({ order }: props) {
    const getOrderedItemsCount = () => {
        const items = order.orderedProducts;
        let itemsCount = 0;
        items.forEach((item) => {
            itemsCount += item.quantity;
        });
        return itemsCount;
    };

    const { orders, setOrders, setShowFullOrder, setClickedOrder } =
        useOrders();

    async function markAsRead() {
        const URL = `/api/orders/${order._id}/seen`;
        const res = await axios.patch(URL);
        if (res.status === 200) {
            order.isSeen = true;
            setOrders([...orders!]);
        }
    }

    return (
        <tr
            className={`cursor-pointer ${
                order.isSeen
                    ? "bg-gray-200 hover:bg-gray-400"
                    : "bg-green-300 hover:bg-green-400"
            }`}
            onClick={() => {
                !order.isSeen && markAsRead();
                setClickedOrder(order);
                setShowFullOrder(true);
            }}
        >
            <th
                scope="row"
                className="px-6 max-sm:px-3 py-4 font-semibold whitespace-nowrap text-gray-900"
            >
                <div className="max-md:w-20 max-md:truncate">{order._id}</div>
            </th>
            <td className="px-6 max-sm:px-3 py-4">{getOrderedItemsCount()}</td>
            <td className="px-6 max-sm:px-3 py-4">{order.total.toFixed(2)}$</td>
            <td className="px-6 max-sm:px-3 py-4">
                {getColoredStatus(order.status)}
            </td>
        </tr>
    );
}

export default SingleOrder;
