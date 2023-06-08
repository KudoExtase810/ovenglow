//Get the right color for each status
const getColoredStatus = (status: order["status"]) => {
    switch (status) {
        case "Ordered":
            return (
                <span className="text-red-500 whitespace-nowrap">{status}</span>
            );
        case "Preparing":
            return (
                <span className="text-orange-600 whitespace-nowrap">
                    {status}
                </span>
            );
        case "Ready":
            return (
                <span className="text-yellow-400 whitespace-nowrap">
                    {status}
                </span>
            );
        case "On the way":
            return (
                <span className="text-lime-500 whitespace-nowrap">
                    {status}
                </span>
            );
        case "Delivered":
            return (
                <span className="text-green-500 whitespace-nowrap">
                    {status}
                </span>
            );
        default:
            return (
                <span className="text-red-600 font-bold animate-ping uppercase">
                    invalid status
                </span>
            );
    }
};
export default getColoredStatus;
