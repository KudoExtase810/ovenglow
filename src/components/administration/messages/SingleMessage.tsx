import { useMessages } from "@/context/MessageContext";
import formatDate from "@/utils/formatDate";
import axios from "axios";

interface props {
    message: message;
}
function SingleMessage({ message }: props) {
    const {
        allMessages,
        setAllMessages,
        selectedMessages,
        setSelectedMessages,
        setShowFullMessage,
        setClickedMessage,
    } = useMessages();

    function selectMessage() {
        if (!selectedMessages.includes(message)) {
            setSelectedMessages([...selectedMessages, message]);
        }
    }

    function deselectMessage() {
        if (selectedMessages.includes(message)) {
            const newSelected = selectedMessages.filter(
                (msg) => msg._id !== message._id
            );
            setSelectedMessages(newSelected);
        }
    }

    async function markAsRead() {
        const URL = `/api/messages/${message._id}`;
        const res = await axios.patch(URL);
        if (res.status === 200) {
            message.isSeen = true;
            setAllMessages([...allMessages!]);
        }
    }

    return (
        <tr
            onClick={() => {
                !message.isSeen && markAsRead();
                setClickedMessage(message);
                setShowFullMessage(true);
            }}
            className={`${
                message.isSeen
                    ? "bg-gray-200 hover:bg-gray-400"
                    : "bg-green-300 hover:bg-green-400"
            } cursor-pointer`}
        >
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input
                        checked={selectedMessages.includes(message)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            e.target.checked
                                ? selectMessage()
                                : deselectMessage();
                        }}
                        id="checkbox-table-search-3"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                        htmlFor="checkbox-table-search-3"
                        className="sr-only"
                    >
                        checkbox
                    </label>
                </div>
            </td>
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
            >
                <div>
                    <span>
                        {message.username}{" "}
                        <span className="sm:hidden"> - </span>
                    </span>
                    <span className="whitespace-nowrap text-gray-600 sm:hidden">
                        {formatDate(message.createdAt, "short")}
                    </span>
                </div>
                <p className="truncate max-w-[240px] sm:hidden text-gray-500">
                    {message.content}
                </p>
            </th>
            <td className="px-6 py-4 max-sm:hidden">
                <p className="truncate max-w-xl">{message.content}</p>
            </td>
            <td className="px-6 py-4 max-sm:hidden">
                <span className="whitespace-nowrap">
                    {formatDate(message.createdAt, "short")}
                </span>
            </td>
        </tr>
    );
}

export default SingleMessage;
