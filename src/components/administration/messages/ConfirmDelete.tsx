import { useMessages } from "@/context/MessageContext";
import FocusTrap from "focus-trap-react";
import { AiOutlineClose } from "react-icons/ai";

interface props {
    setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
    deleteSelected: () => Promise<void>;
}

function ConfirmDelete({ setShowConfirmDelete, deleteSelected }: props) {
    const { selectedMessages } = useMessages();

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
                                        onClick={() =>
                                            setShowConfirmDelete(false)
                                        }
                                    >
                                        <AiOutlineClose
                                            className=""
                                            size={22}
                                        />
                                    </button>
                                    <h3 className="font-cormorant uppercase font-semibold text-3xl text-zinc-950 mb-3">
                                        confirm delete
                                    </h3>
                                    <p className="text-zinc-600 font-mulish text-xl">
                                        {selectedMessages.length === 1
                                            ? "Are you sure you want to delete the selected message?"
                                            : `Are you sure you want to delete the ${selectedMessages.length} selected messages?`}
                                    </p>
                                    <div className="ml-auto w-fit flex gap-2 mt-4">
                                        <button
                                            onClick={() =>
                                                setShowConfirmDelete(false)
                                            }
                                            aria-label="cancel delete"
                                            type="button"
                                            className="text-zinc-800 bg-zinc-400 uppercase px-12 py-4 text-sm tracking-widest hover:bg-zinc-500 transition-colors duration-300"
                                        >
                                            cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                deleteSelected();
                                                setShowConfirmDelete(false);
                                            }}
                                            aria-label="confirm delete"
                                            type="button"
                                            className="text-zinc-50 bg-red-500 uppercase px-12 py-4 text-sm tracking-widest hover:bg-red-600 transition-colors duration-300"
                                        >
                                            delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FocusTrap>
    );
}

export default ConfirmDelete;
