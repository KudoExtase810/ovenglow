import { useCart } from "@/context/CartContext";
import getRating from "@/utils/getRating";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCartCheck, BsCartPlus } from "react-icons/bs";
import { toast } from "react-toastify";

interface props {
    product: product;
}

type review = {
    rating: 1 | 2 | 3 | 4 | 5;
    reviewText: string;
    user: string;
    createdAt: string;
};

function SingleItem({ product }: props) {
    const [isHovered, setIsHovered] = useState(false);
    const [averageRating, setAverageRating] = useState(0);

    const { _id, title, price, salePrice, image, quantity, reviews } = product;

    const getAverageRating = () => {
        const reviewsCount = reviews!.length;
        if (reviewsCount === 0) {
            return (product.rating = 0);
        }

        // the total of stars for this product
        let ratingSum = 0;
        reviews!.forEach((review: review) => (ratingSum += review.rating));

        // average rating for this product
        const averageProductRating = ratingSum / reviewsCount;

        setAverageRating(averageProductRating);
        product.rating = averageProductRating as product["rating"];
    };

    useEffect(() => {
        getAverageRating();
        // add a rating property to each product
    }, []);

    const { cartItems, setCartItems } = useCart();

    const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>();
    useEffect(() => {
        const idx = cartItems.findIndex((item) => item._id === _id);
        setIsAlreadyInCart(idx !== -1);
    }, [cartItems]);

    const addToCart = () => {
        const localStorageCart = JSON.parse(
            localStorage.getItem("cart")!
        ) as product[];
        const wantedProduct = localStorageCart.find(
            (lsProduct) => lsProduct._id === product._id
        );
        if (quantity === 0 || wantedProduct?.quantity === 0) {
            return toast.error(
                <span>
                    There are no <b>{title}</b> left. Come back later!
                </span>
            );
        }
        setCartItems([...cartItems, product]);
    };

    return (
        <li
            className="flex flex-col w-max justify-center items-center gap-1"
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
        >
            <div className="relative">
                <Link href={`/products/${_id}`} className="mb-2">
                    <div className="w-[300px] h-[300px] max-xl:w-[250px] max-xl:h-[250px] max-lg:w-[300px] max-lg:h-[300px] max-[875px]:w-[250px] max-[875px]:h-[250px] max-md:w-[350px] max-md:h-[350px]">
                        <Image
                            src={image}
                            fill
                            alt={title}
                            className="rounded-md object-cover"
                        />
                        {quantity !== 0 && salePrice && (
                            <span className="bg-brown uppercase text-zinc-50 font-mulish tracking-wider absolute top-0 left-0 px-3 text-sm">
                                sale
                            </span>
                        )}
                        {!quantity && (
                            <span className="bg-red-500 uppercase text-zinc-50 font-mulish tracking-wider absolute top-0 left-0 px-3 text-sm">
                                sold out
                            </span>
                        )}
                    </div>
                </Link>
                {isHovered && (
                    <div className="absolute bottom-2 w-full z-[2] font-mulish font-semibold text-xs max-lg:hidden">
                        {!isAlreadyInCart ? (
                            <button
                                onClick={addToCart}
                                type="button"
                                className="flex gap-2 bg-zinc-50 text-zinc-900 hover:bg-brown hover:text-zinc-50 transition-colors duration-500 w-[95%] py-4 justify-center items-center mx-auto"
                            >
                                <BsCartPlus size={22} />
                                <span className="uppercase">Add to cart</span>
                            </button>
                        ) : (
                            <div className="flex gap-2 w-[95%] py-4 justify-center items-center mx-auto bg-brown text-zinc-50">
                                <BsCartCheck size={22} />
                                <span className="block text-center uppercase">
                                    Already in cart
                                </span>
                            </div>
                        )}
                    </div>
                )}
                <div className="z-[2] absolute top-3 right-3 lg:hidden">
                    {isAlreadyInCart ? (
                        <button className="rounded-full bg-brown w-[40px] h-[40px] flex items-center justify-center">
                            <span className="sr-only">already in cart</span>
                            <BsCartCheck size={26} />
                        </button>
                    ) : (
                        <button
                            className="rounded-full bg-gray-300 hover:bg-brown transition-colors duration-500 w-[40px] h-[40px] flex items-center justify-center"
                            onClick={addToCart}
                        >
                            <span className="sr-only">add to cart</span>
                            <BsCartPlus size={26} />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex justify-center">
                {getRating(averageRating as review["rating"])}
            </div>
            <Link
                href={`/products/${_id}`}
                className="font-cormorant font-bold text-zinc-900 text-lg uppercase max-w-[285px] max-xl:max-w-[235px] truncate max-xl:text-base max-lg:text-lg"
            >
                {title}
            </Link>
            <div className="font-semibold font-mulish">
                <span
                    className={`${
                        salePrice ? "text-zinc-400 line-through" : "text-brown"
                    }`}
                >
                    ${price.toFixed(2)}
                </span>
                {salePrice && (
                    <span className="ml-3 text-brown">
                        ${salePrice.toFixed(2)}
                    </span>
                )}
            </div>
        </li>
    );
}

export default SingleItem;
