import { useOrders } from "@/context/OrdersContext";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineTicket } from "react-icons/hi";
import { TiPrinter } from "react-icons/ti";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import getColoredStatus from "@/utils/getColoredStatus";
import ReactToPrint from "react-to-print";
import Receipt from "./Receipt";
import FocusTrap from "focus-trap-react";

function FullOrder() {
    const {
        setShowFullOrder,
        clickedOrder,
        setClickedOrder,
        orders,
        setOrders,
    } = useOrders();

    const [newStatus, setNewStatus] = useState<order["status"]>(
        clickedOrder!.status
    );

    const updateStatus = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (clickedOrder?.status === newStatus) return;
        const res = await axios.patch(
            `/api/orders/${clickedOrder?._id}/status`,
            {
                newStatus,
            }
        );
        if (res.status === 200) {
            toast.success("Status updated successfully.");
            orders?.forEach((order) => {
                if (order._id === clickedOrder?._id) {
                    order.status = newStatus;
                    setOrders([...orders]);
                }
            });
        } else toast.error("Failed to update status. Try again later.");
    };

    const receiptRef = useRef();

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
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <div className="bg-white p-6">
                                <div className="relative">
                                    <button
                                        type="button"
                                        aria-label="close"
                                        className="absolute -right-2 -top-2 hover:text-zinc-400"
                                        onClick={() => {
                                            setShowFullOrder(false);
                                            setClickedOrder(undefined);
                                        }}
                                    >
                                        <AiOutlineClose size={22} />
                                    </button>
                                    <div className="font-mulish ">
                                        <header className="flex items-center gap-2 my-1  w-fit">
                                            <h2 className="text-3xl font-bold text-zinc-950 font-cormorant uppercase">
                                                order{" "}
                                            </h2>
                                            <HiOutlineTicket
                                                size={54}
                                                className="text-brown animate-pulse "
                                            />
                                        </header>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-mulish font-bold text-sm text-zinc-700">
                                                {clickedOrder?._id}
                                            </span>
                                            <div className="font-medium text-lg">
                                                {getColoredStatus(
                                                    clickedOrder?.status!
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-xl font-bold mb-6">
                                            Customer:{" "}
                                            {clickedOrder?.customer.name}
                                            <>
                                                <ReactToPrint
                                                    trigger={() => (
                                                        <button
                                                            type="button"
                                                            aria-label="print receipt"
                                                            className="hover:text-zinc-600"
                                                        >
                                                            <abbr title="Print receipt">
                                                                <TiPrinter
                                                                    size={52}
                                                                />
                                                            </abbr>
                                                        </button>
                                                    )}
                                                    content={() =>
                                                        receiptRef.current!
                                                    }
                                                />
                                                <Receipt
                                                    receiptRef={receiptRef}
                                                />
                                            </>
                                        </div>
                                        <div className="mb-6">
                                            <ul className=" flex flex-col gap-2 mx-a">
                                                {clickedOrder?.orderedProducts.map(
                                                    (product) => (
                                                        <li className="relative">
                                                            <div className="flex items-center text-lg text-zinc-900 gap-5 font-bold justify-between">
                                                                <span className="w-[300px]">
                                                                    {
                                                                        product.quantity
                                                                    }
                                                                    x{" "}
                                                                    {
                                                                        product.name
                                                                    }
                                                                </span>
                                                                <span>
                                                                    {(
                                                                        product.price *
                                                                        product.quantity
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                    $
                                                                </span>
                                                            </div>
                                                        </li>
                                                    )
                                                )}
                                                <li className="text-lg font-bold font-mulish text-zinc-950 border-dashed border-y-2 border-zinc-950 my-3 py-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="w-[300px]">
                                                            Total
                                                        </span>
                                                        <span>
                                                            {clickedOrder?.total.toFixed(
                                                                2
                                                            )}
                                                            $
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <form
                                            onSubmit={updateStatus}
                                            className="flex items-center justify-between gap-5 max-sm:flex-col-reverse"
                                        >
                                            <button
                                                type="submit"
                                                className="text-zinc-50 bg-green-500 px-12 py-4 text-sm tracking-widest uppercase hover:bg-blue-500 transition-colors duration-300 max-sm:w-11/12"
                                            >
                                                update status
                                            </button>
                                            <select
                                                id="status"
                                                className="border text-zinc-900 font-bold border-zinc-400 pl-4 pr-16 py-4 text-sm cursor-pointer tracking-widest max-sm:w-11/12"
                                                onChange={(e) =>
                                                    setNewStatus(
                                                        e.target
                                                            .value as order["status"]
                                                    )
                                                }
                                            >
                                                {[
                                                    "Ordered",
                                                    "Preparing",
                                                    "Ready",
                                                    "On the way",
                                                    "Delivered",
                                                ].map((status) => (
                                                    <option
                                                        value={status}
                                                        selected={
                                                            clickedOrder?.status ===
                                                            status
                                                        }
                                                    >
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </form>
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

export default FullOrder;
