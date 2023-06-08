import { useOrders } from "@/context/OrdersContext";

function Receipt({ receiptRef }: any) {
    const { clickedOrder } = useOrders();
    return (
        <div
            className="hidden print:block my-6 w-[9cm] mx-auto px-4 py-6"
            ref={receiptRef}
        >
            <div className="border-y-2 border-dashed border-zinc-950 py-3">
                <h1 className="font-cormorant text-3xl text-zinc-950 font-bold uppercase border-y-2 border-dashed border-zinc-950 py-2 text-center tracking-wide">
                    receipt
                </h1>
            </div>
            <div>
                <ul className="font-mulish border-b-2 border-dashed border-zinc-950 py-4">
                    {clickedOrder?.orderedProducts.map((product) => (
                        <li className="flex justify-between">
                            <span>
                                {product.quantity}x {product.name}
                            </span>
                            <span>
                                ${" "}
                                {(product.price * product.quantity).toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between py-2 border-b-2 border-dashed border-zinc-950">
                    <span className="font-bold uppercase">total amount</span>$
                    {clickedOrder?.total.toFixed(2)}
                </div>
                <div className="bold text-3xl uppercase text-center border-b-2 border-dashed border-zinc-950 py-2">
                    thank you
                </div>
            </div>
        </div>
    );
}

export default Receipt;
