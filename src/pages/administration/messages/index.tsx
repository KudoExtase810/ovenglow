import MessageList from "@/components/administration/messages/MessageList";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useMessages } from "@/context/MessageContext";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useEffect, useState } from "react";
import ConfirmDelete from "@/components/administration/messages/ConfirmDelete";
import FullMessage from "@/components/administration/messages/FullMessage";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next/types";
function index() {
    const {
        allMessages,
        setAllMessages,
        selectedMessages,
        setSelectedMessages,
        showFullMessage,
    } = useMessages();

    // control tooltip visibility
    const [deleteHovered, setDeleteHovered] = useState(false);
    const [markAllHovered, setMarkAllHovered] = useState(false);

    // confirm delete modal
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    useEffect(() => {
        if (showConfirmDelete) {
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.body.classList.remove("overflow-y-hidden");
        }
    }, [showConfirmDelete]);

    // full message modal
    useEffect(() => {
        if (showFullMessage) {
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.body.classList.remove("overflow-y-hidden");
        }
    }, [showFullMessage]);

    //Select all messages
    function selectAll() {
        const newSelected = [];
        for (let i = 0; i < allMessages!.length; i++) {
            newSelected.push(allMessages![i]);
        }
        setSelectedMessages(newSelected);
    }

    // Deselect every message
    function deselectAll() {
        setSelectedMessages([]);
    }

    // Check if all messages are selected
    function allMessagesSelected(): boolean {
        // Check if the arrays have the same length
        if (allMessages!.length !== selectedMessages.length) {
            return false;
        }

        // Check if every if all elements are in both arrays
        const allSelected = allMessages!.every((message) => {
            return selectedMessages.some((selectedMessage) => {
                return selectedMessage._id === message._id;
            });
        });

        return allSelected;
    }

    // Delete selected messages
    async function deleteSelected() {
        if (allMessagesSelected()) {
            const response = await axios.delete("/api/messages");
            if (response.status === 200) {
                toast.success("All messages have been deleted.");
                setAllMessages([]);
                setSelectedMessages([]);
            } else {
                toast.error("Failed to delete messages. Please try again.");
            }
        } else {
            const deletePromises = selectedMessages.map((msg) =>
                axios.delete(`/api/messages/${msg._id}`)
            );
            try {
                await Promise.all(deletePromises);
                const filtered = allMessages!.filter(
                    (msg) => !selectedMessages.includes(msg)
                );
                setAllMessages(filtered);
                setSelectedMessages([]);
                toast.success("Selected messages have been deleted.");
            } catch {
                toast.error(
                    "Failed to delete the selected messages. Please try again."
                );
            }
        }
    }

    //mark every msg as seen
    async function markAllAsRead() {
        if (!allMessages?.some((msg) => msg.isSeen === false)) return;

        const response = await axios.patch("/api/messages");
        if (response.status === 200) {
            const updatedMessages = allMessages!.map((message) => ({
                ...message,
                isSeen: true,
            }));
            setAllMessages(updatedMessages);
        }
    }

    if (!allMessages) {
        return (
            <div className="mx-auto my-32 w-fit">
                <LoadingSpinner />
            </div>
        );
    } else if (allMessages.length === 0) {
        return (
            <>
                <h2 className="text-2xl uppercase font-cormorant py-6 w-4/5 border border-zinc-300 mx-auto text-center font-semibold mt-32">
                    there are no messages to show.
                </h2>
                <Link
                    className="block text-zinc-50 uppercase bg-zinc-900 px-12 py-4 text-sm tracking-widest w-max hover:bg-brown transition-colors duration-300 mr-auto mt-12 mb-32 mx-auto"
                    href="/"
                >
                    return to home
                </Link>
            </>
        );
    } else
        return (
            <>
                {showConfirmDelete && (
                    <ConfirmDelete
                        setShowConfirmDelete={setShowConfirmDelete}
                        deleteSelected={deleteSelected}
                    />
                )}
                {showFullMessage && <FullMessage />}
                <div className="mx-8 mb-16 ">
                    <h2 className="font-cormorant uppercase font-semibold text-3xl text-zinc-950 py-4">
                        store messages
                    </h2>

                    <div className="flex items-center justify-between p-4 bg-gray-300">
                        <input
                            checked={
                                allMessagesSelected() &&
                                allMessages.length !== 0
                            }
                            type="checkbox"
                            onChange={(e) =>
                                e.target.checked ? selectAll() : deselectAll()
                            }
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onMouseEnter={() => setDeleteHovered(true)}
                                onMouseLeave={() => setDeleteHovered(false)}
                                aria-label="Delete selected messages"
                                onClick={() => {
                                    if (!selectedMessages.length) {
                                        return toast.error(
                                            "There are no messages selected."
                                        );
                                    }
                                    setShowConfirmDelete(true);
                                }}
                                className="relative"
                            >
                                <RiDeleteBin6Line
                                    size={24}
                                    className="text-zinc-900 hover:text-red-500"
                                />
                                {deleteHovered && (
                                    <div className="absolute bg-gray-400 px-2 py-1 text-zinc-900 rounded-md shadow-md z-10 font-mulish font-semibold w-max right-0">
                                        Delete selected messages
                                    </div>
                                )}
                            </button>
                            <button
                                onMouseEnter={() => setMarkAllHovered(true)}
                                onMouseLeave={() => setMarkAllHovered(false)}
                                aria-label="Mark all messages as read"
                                onClick={markAllAsRead}
                                className="relative"
                            >
                                <MdOutlineMarkEmailRead
                                    size={24}
                                    className="text-zinc-900 hover:text-green-500"
                                />
                                {markAllHovered && (
                                    <div className="absolute bg-gray-400 px-2 py-1 text-zinc-900 rounded-md shadow-md z-10 font-mulish font-semibold w-max right-0">
                                        Mark all messages as read
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                    <MessageList />
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
