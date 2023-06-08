import { useCart } from "@/context/CartContext";
import updateStat from "@/utils/updateStat";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import FocusTrap from "focus-trap-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { toast } from "react-toastify";

interface props {
    total: number;
    setShowOrderConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConfirmOrder({ total, setShowOrderConfirmation }: props) {
    const { cartItems, setCartItems } = useCart();

    const router = useRouter();

    const [shouldDeliver, setShouldDeliver] = useState<boolean>();

    const { data: session } = useSession();
    const validateOrder = async () => {
        let orderedProducts: {
            name: string;
            quantity: number;
            price: number;
            image: string;
        }[] = [];

        const customer = {
            name: session?.user?.name,
            email: session?.user?.email,
            phone: "", //!-------------
        };

        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            orderedProducts.push({
                name: item.title,
                quantity: item.amountInCart,
                price: item.salePrice || item.price,
                image: item.image,
            });
        }

        const res = await axios.post("/api/orders", {
            customer,
            total: total.toFixed(2),
            orderedProducts,
            shouldDeliver,
            isPaid: shouldDeliver as boolean,
        });
        if (res.status === 201) {
            toast.success("Successfully ordered. Thank you!");
            setShowOrderConfirmation(false);
            updateQuantity();
            setCartItems([]);
            updateStat(session?.user?.email!, "totalSpent", total);
            updateStat(session?.user?.email!, "ordersPlaced");
            router.push("/profile");
        }
    };

    // Update the quanity of each product in the cart in both front and back
    const updateQuantity = async () => {
        cartItems.forEach(async (product) => {
            await axios.patch(`/api/products/${product._id}/quantity`, {
                quantityBought: product.amountInCart,
            });
            // Update the amount in the client side
            product.quantity -= product.amountInCart;
        });
        setCartItems([...cartItems]);
    };

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
                                            setShowOrderConfirmation(false);
                                        }}
                                    >
                                        <AiOutlineClose size={22} />
                                    </button>
                                </div>
                                <h3 className="font-cormorant uppercase font-semibold text-2xl text-zinc-950 mb-3">
                                    confirm your order of
                                </h3>
                                <ul className="text-lg flex flex-col gap-2 font-mulish text-zinc-900 mb-3">
                                    {cartItems.map((item) => (
                                        <li>
                                            {item.amountInCart}x {item.title}{" "}
                                            <Link
                                                target="_blank"
                                                href={`/products/${item._id}`}
                                            >
                                                <FiExternalLink
                                                    size={20}
                                                    className="hover:text-zinc-500 inline mb-[2px] ml-2"
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                {shouldDeliver && (
                                    <PayPalScriptProvider
                                        options={{
                                            "client-id":
                                                process.env
                                                    .NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                                        }}
                                    >
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order
                                                    .create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: total.toString(),
                                                                },
                                                            },
                                                        ],
                                                    })
                                                    .then((orderId) => {
                                                        // Your code here after create the order
                                                        return orderId;
                                                    });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions
                                                    .order!.capture()
                                                    .then(validateOrder);
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                )}
                                <div className="w-fit text-lg font-mulish font-medium">
                                    <div>
                                        <input
                                            type="radio"
                                            name="deliver"
                                            id="deliver"
                                            className="mr-1"
                                            onChange={(e) =>
                                                setShouldDeliver(
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <label htmlFor="deliver">
                                            Deliver the order to my place
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            name="deliver"
                                            id="pickup"
                                            className="mr-1"
                                            onChange={(e) =>
                                                setShouldDeliver(
                                                    !e.target.checked
                                                )
                                            }
                                        />
                                        <label htmlFor="pickup">
                                            I will pick the order up myself
                                        </label>
                                    </div>
                                </div>
                                {shouldDeliver ? (
                                    <button
                                        onClick={() => {
                                            if (shouldDeliver === undefined)
                                                return toast.error(
                                                    "Please pick an option from the two above."
                                                );
                                            validateOrder();
                                        }}
                                        type="button"
                                        className="font-mulish font-semibold p-4 mt-3 tracking-wide text-white bg-green-600 hover:bg-green-800 transition-colors rounded-sm uppercase"
                                    >
                                        simulate successful checkout
                                    </button>
                                ) : (
                                    <button
                                        className="block uppercase text-zinc-50 bg-zinc-900 px-12 py-4 text-sm tracking-widest w-max hover:bg-brown transition-colors duration-300 mt-6 mx-auto"
                                        onClick={() => {
                                            if (shouldDeliver === undefined)
                                                return toast.error(
                                                    "Please pick an option from the two above."
                                                );
                                            validateOrder();
                                        }}
                                    >
                                        confirm orders
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FocusTrap>
    );
}

export default ConfirmOrder;
