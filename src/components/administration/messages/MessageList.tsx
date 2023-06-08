import { useMessages } from "@/context/MessageContext";
import SingleMessage from "./SingleMessage";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function MessageList() {
    const [parent] = useAutoAnimate();
    const { allMessages } = useMessages();
    return (
        // <div className="relative overflow-x-auto">
        //     <ul className="font-mulish text-lg w-full" ref={parent}>
        //         {allMessages!.map((message) => (
        //             <SingleMessage message={message} key={message._id} />
        //         ))}
        //     </ul>
        // </div>

        <div className="relative overflow-x-auto shadow-md font-mulish">
            <table className="w-full text-left text-gray-700 text-lg">
                <tbody>
                    {allMessages!.map((message) => (
                        <SingleMessage message={message} key={message._id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MessageList;
