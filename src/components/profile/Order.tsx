import getColoredStatus from "@/utils/getColoredStatus";

interface props {
    order: order;
}

function Order({ order }: props) {
    const getOrderedItemsCount = () => {
        const items = order.orderedProducts;
        let itemsCount = 0;
        items.forEach((item) => {
            itemsCount += item.quantity;
        });
        return itemsCount;
    };
    return (
        <tr className="bg-gray-200">
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

export default Order;
