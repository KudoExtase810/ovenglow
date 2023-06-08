import { toast } from "react-toastify";
import { FaCaretLeft, FaCaretRight, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface props {
    id: product["_id"];
    title: product["title"];
    price: product["price"] | product["salePrice"];
    quantity: product["quantity"];
    image: product["image"];
    amountInCart: number;
    getTotal: () => void;
}

function CartItem({
    id,
    title,
    price,
    quantity,
    image,
    amountInCart,
    getTotal,
}: props) {
    // todo set default quantity to the one from products page
    const { cartItems, setCartItems } = useCart();

    const removeFromCart = () => {
        const filtered = cartItems.filter((item) => item._id !== id);
        setCartItems(filtered);
    };

    const handleQtyChange = (productId: string, change: 1 | -1) => {
        let idx = -1;
        cartItems.forEach((item, index) => {
            if (item._id === productId) idx = index;
        });

        const tempArr = cartItems;
        tempArr[idx].amountInCart += change;
        if (tempArr[idx].amountInCart === 0) tempArr[idx].amountInCart = 1;
        setCartItems([...tempArr]);
        getTotal();
    };

    return (
        <tr className="border-b">
            <td>
                <button aria-label="remove from cart" onClick={removeFromCart}>
                    <FaTrashAlt
                        size={22}
                        className="text-zinc-900 hover:text-red-600"
                    />
                </button>
            </td>
            <td className="px-4 max-md:px-2 max-lg:py-3">
                <Link
                    href={`/products/${id}`}
                    className="flex gap-3 items-center py-5 w-fit hover:text-brown"
                >
                    <Image
                        src={image}
                        alt={title}
                        width={100}
                        height={100}
                        className="max-lg:hidden"
                    />
                    <span>{title}</span>
                </Link>
            </td>
            <td className="px-4 max-md:px-2 max-lg:py-3">
                {price?.toFixed(2)}$
            </td>
            <td className="px-4 max-md:px-2 max-lg:py-3">
                <div className="flex gap-2 items-center border px-5 h-[52px] w-max">
                    <button
                        aria-label="remove one from cart"
                        onClick={() => {
                            amountInCart > 1 && handleQtyChange(id, -1);
                        }}
                    >
                        <FaCaretLeft className="hover:text-brown" />
                    </button>
                    <span className="">
                        {amountInCart < 10 ? "0" + amountInCart : amountInCart}
                    </span>
                    <button
                        aria-label="add one to cart"
                        onClick={() => {
                            if (quantity <= amountInCart)
                                return toast.error(
                                    <span>
                                        There are only {quantity} <b>{title}</b>{" "}
                                        left
                                    </span>
                                );

                            handleQtyChange(id, 1);
                        }}
                    >
                        <FaCaretRight className="hover:text-brown" />
                    </button>
                </div>
            </td>
            <td className="px-4 max-md:px-2 max-lg:py-3">
                {(price! * amountInCart).toFixed(2)}$
            </td>
        </tr>
    );
}

export default CartItem;
