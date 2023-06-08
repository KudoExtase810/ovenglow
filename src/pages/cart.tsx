import CartItems from "@/components/cart/CartItems";
import ConfirmOrder from "@/components/cart/ConfirmOrder";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

function cart() {
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    useEffect(() => {
        document.body.classList.toggle("overflow-y-hidden");
    }, [showOrderConfirmation]);

    const [total, setTotal] = useState<number>(0);

    const { cartItems } = useCart();

    if (!cartItems.length) {
        return (
            <>
                <h2 className="text-2xl font-cormorant py-6 w-4/5 border border-zinc-300 mx-auto text-center font-semibold mt-32 uppercase">
                    Your cart is currently empty.
                </h2>
                <Link
                    className="block text-zinc-50 bg-zinc-900 px-12 py-4 text-sm tracking-widest w-max hover:bg-brown transition-colors duration-300 mr-auto mt-12 mb-32 mx-auto uppercase"
                    href="/shop"
                >
                    return to shop
                </Link>
            </>
        );
    } else
        return (
            <>
                <CartItems
                    total={total}
                    setTotal={setTotal}
                    setShowOrderConfirmation={setShowOrderConfirmation}
                />
                {showOrderConfirmation && (
                    <ConfirmOrder
                        total={total}
                        setShowOrderConfirmation={setShowOrderConfirmation}
                    />
                )}
            </>
        );
}

export default cart;
