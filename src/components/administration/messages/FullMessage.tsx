import { useMessages } from "@/context/MessageContext";
import formatDate from "@/utils/formatDate";
import FocusTrap from "focus-trap-react";
import { AiOutlineClose } from "react-icons/ai";

function FullMessage() {
    const { setShowFullMessage, clickedMessage, setClickedMessage } =
        useMessages();

    return (
        <FocusTrap>
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 overflow-y-auto animate-fade-down animate-duration-500">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white p-6">
                                <div className="relative">
                                    <button
                                        type="button"
                                        aria-label="close"
                                        className="absolute -right-2 -top-2 hover:text-zinc-400"
                                        onClick={() => {
                                            setShowFullMessage(false);
                                            setClickedMessage(undefined);
                                        }}
                                    >
                                        <AiOutlineClose size={22} />
                                    </button>
                                    <div className="font-cormorant font-semibold text-3xl text-zinc-950 mb-3 flex flex-col gap-1">
                                        <span>{clickedMessage!.username}</span>
                                        <div className="font-mulish text-base flex justify-between">
                                            <span>{clickedMessage!.email}</span>
                                            <span className="mr-4">
                                                {formatDate(
                                                    clickedMessage?.createdAt!,
                                                    "long"
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-600 font-mulish text-xl">
                                        {clickedMessage!.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FocusTrap>
    );
}

export default FullMessage;
