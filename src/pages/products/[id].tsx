import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import getRating from "@/utils/getRating";
import Reviews from "@/components/products/Reviews";
import AddReview from "@/components/products/AddReview";
import { useCart } from "@/context/CartContext";
import dbConnect from "@/utils/dbconnect";
import ProductModel from "@/models/products";

interface props {
    product: product;
}

type review = {
    rating: 1 | 2 | 3 | 4 | 5;
    reviewText: string;
    user: string;
    createdAt: string;
};

function Product({ product }: props) {
    const [averageRating, setAverageRating] = useState(0);

    // To make working with state easier
    const [productState, setProductState] = useState<product>(product);
    const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>();
    const {
        _id,
        title,
        category,
        price,
        salePrice,
        description,
        image,
        quantity,
        tags,
        reviews,
    } = productState;

    const { cartItems, setCartItems } = useCart();

    const [itemQuantity, setItemQuantity] = useState(quantity && 1);

    const getAverageRating = () => {
        const reviewsCount = reviews!.length;
        if (reviewsCount === 0) return;

        // the total of stars for this product
        let ratingSum = 0;
        reviews!.forEach((review: review) => (ratingSum += review.rating));

        // average rating for this product
        const averageProductRating = ratingSum / reviewsCount;

        setAverageRating(averageProductRating);
    };

    useEffect(() => {
        getAverageRating();
    }, [productState]);

    useEffect(() => {
        const idx = cartItems.findIndex((item) => item._id === _id);
        setIsAlreadyInCart(idx !== -1);
    }, [cartItems]);

    const addToCart = () => {
        if (quantity === 0)
            return toast.error(
                <span>
                    There are no <b>{title}</b> left.
                </span>
            );
        const isAlreadyInCart = cartItems.some((item) => item._id === _id);
        if (isAlreadyInCart)
            return toast.error("This product is already in your cart.");
        setCartItems([
            ...cartItems,
            { ...product, amountInCart: itemQuantity },
        ]);
    };

    return (
        <div className="w-fit mx-auto max-xl:mx-5 max-md:mx-3">
            <section className="flex gap-16 py-16 mb-8 border-b border-gray-200 max-xl:gap-12 max-lg:gap-6 max-lg:flex-col">
                <div className="relative w-[600px] h-[600px] max-xl:w-[510px] max-xl:h-[510px] max-lg:w-[600px] max-lg:h-[600px] max-sm:w-[500px] max-sm:h-[500px] max-[540px]:h-[420px] max-[540px]:w-[420px] max-[450px]:w-[300px] max-[450px]:h-[300px] ">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="rounded-md object-cover"
                    />
                    {quantity !== 0 && salePrice && (
                        <span className="bg-brown text-zinc-50 font-mulish tracking-widest absolute top-0 left-0 px-6 py-2 text-sm uppercase">
                            sale
                        </span>
                    )}
                    {!quantity && (
                        <span className="bg-red-500 text-zinc-50 font-mulish tracking-widest absolute top-0 left-0 px-6 py-2 text-sm uppercase">
                            sold out
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="flex mb-1">
                            {getRating(averageRating as review["rating"])}
                        </div>
                        <h1 className="font-cormorant font-extrabold text-zinc-900 text-4xl uppercase">
                            {title}
                        </h1>
                    </div>
                    <div>
                        <div className="font-bold font-mulish text-2xl">
                            <span
                                className={`${
                                    salePrice
                                        ? "text-zinc-400 line-through"
                                        : "text-brown"
                                }`}
                            >
                                ${price?.toFixed(2)}
                            </span>
                            {salePrice && (
                                <span className="ml-3 text-brown">
                                    ${salePrice?.toFixed(2)}
                                </span>
                            )}
                        </div>
                        <p className="text-base lg:max-w-xl font-normal text-zinc-600 my-5">
                            {description || (
                                <span className="text-red-500">
                                    No description to show.
                                </span>
                            )}
                        </p>
                    </div>
                    {!isAlreadyInCart ? (
                        <div className="flex font-mulish items-center mb-5">
                            <div className="flex gap-2 items-center border px-6 h-[52px]">
                                <span className="text-xs">Quantity</span>
                                <button
                                    aria-label="remove one from cart"
                                    onClick={() => {
                                        itemQuantity > 1 &&
                                            setItemQuantity((prev) => prev - 1);
                                    }}
                                >
                                    <FaCaretLeft className="hover:text-brown" />
                                </button>
                                <span>{itemQuantity}</span>
                                <button
                                    aria-label="add one to cart"
                                    onClick={() => {
                                        if (quantity === 0)
                                            return toast.error(
                                                <span>
                                                    There are no <b>{title}</b>{" "}
                                                    left.
                                                </span>
                                            );
                                        if (quantity <= itemQuantity)
                                            return toast.error(
                                                `There are only ${quantity} "${title}" left.`
                                            );
                                        setItemQuantity((prev) => prev + 1);
                                    }}
                                >
                                    <FaCaretRight className="hover:text-brown" />
                                </button>
                            </div>
                            <button
                                onClick={addToCart}
                                type="button"
                                className="text-zinc-50 bg-zinc-900 px-11 h-[52px] text-sm tracking-wide hover:bg-brown transition-colors duration-300 uppercase"
                            >
                                add to cart
                            </button>
                        </div>
                    ) : (
                        <div className="px-11 py-3 font-mulish text-lg text-zinc-50 bg-brown w-fit">
                            This item is already in your cart.
                        </div>
                    )}
                    <div className="flex flex-col font-mulish text-zinc-700 font-semibold">
                        <div>
                            <span className="mr-2 text-zinc-950">
                                Quantity left:
                            </span>
                            <span>{quantity}</span>
                        </div>
                        <div>
                            <span className="mr-2 text-zinc-950">
                                Category:
                            </span>
                            <span>{category}</span>
                        </div>
                        <div>
                            <span className="mr-2 text-zinc-950">Tags:</span>
                            <ul className="inline">
                                {tags.map((tag, index) => (
                                    <li
                                        key={index}
                                        className="inline mr-[5px] last:mr-0"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="font-mulish text-lg font-semibold uppercase mb-6">
                    {reviews?.length ? (
                        <div>
                            {reviews!.length > 1 ? (
                                <h3>
                                    {reviews!.length} reviews for {title}
                                </h3>
                            ) : (
                                <h3>
                                    {reviews!.length} review for {title}
                                </h3>
                            )}
                        </div>
                    ) : (
                        <span className="text-red-500">
                            This product has no reviews.
                        </span>
                    )}
                </div>
                <Reviews reviews={reviews} />
                <AddReview
                    productState={productState}
                    setProductState={setProductState}
                />
            </section>
        </div>
    );
}

export async function getServerSideProps({ params }: any) {
    await dbConnect();
    const product = await ProductModel.findById(params.id);

    if (!product) {
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
            props: {},
        };
    }

    return {
        props: {
            //? Kinda weird but this is the way to solve a mongoose problem here lol ( legit )
            product: JSON.parse(JSON.stringify(product)),
        },
    };
}

export default Product;
