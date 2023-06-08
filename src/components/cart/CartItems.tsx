import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface props {
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    setShowOrderConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}

function CartItems({ total, setTotal, setShowOrderConfirmation }: props) {
    const { cartItems } = useCart();

    const router = useRouter();

    const { data: session } = useSession();

    const [parent] = useAutoAnimate();

    // get total price of the items in cart
    const getTotal = () => {
        let ans = 0;
        cartItems.forEach((item) => {
            ans = ans + item.amountInCart * (item.salePrice || item.price);
        });
        setTotal(ans);
    };

    useEffect(() => {
        getTotal();
    }, [cartItems]);

    return (
        <div className="lg:mx-6">
            <table className="font-mulish md:text-lg w-full text-left my-16">
                <thead>
                    <tr className="border-b">
                        <th></th>
                        <th className="px-4 max-md:px-2 py-3">Product</th>
                        <th className="px-4 max-md:px-2 py-3">Price</th>
                        <th className="px-4 max-md:px-2 py-3">Quantity</th>
                        <th className="px-4 max-md:px-2 py-3">Subtotal</th>
                    </tr>
                </thead>
                <tbody ref={parent}>
                    {cartItems.map((product) => (
                        <CartItem
                            key={product._id}
                            getTotal={getTotal}
                            id={product._id}
                            title={product.title}
                            price={product.salePrice || product.price}
                            quantity={product.quantity}
                            image={product.image}
                            amountInCart={product.amountInCart}
                        />
                    ))}
                </tbody>
            </table>
            <div className="font-mulish mb-16 max-lg:ml-4">
                <h2 className="font-cormorant uppercase text-3xl font-bold mb-6">
                    confirm order
                </h2>
                <table>
                    <tbody className="text-zinc-700 text-lg border-y ">
                        <tr>
                            <th className="pr-64 py-3">Total</th>
                            <td>{total.toFixed(2)}$</td>
                        </tr>
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={() => {
                        if (!session) return router.push("/login");
                        setShowOrderConfirmation(true);
                    }}
                    className="text-zinc-50 bg-zinc-900 uppercase disabled:bg-gray-400 px-12 py-4 mt-4 text-sm tracking-widest hover:bg-brown transition-colors duration-300"
                >
                    confirm
                </button>
            </div>
        </div>
    );
}

export default CartItems;
