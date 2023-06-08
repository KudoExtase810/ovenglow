import updateStat from "@/utils/updateStat";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";

interface props {
    productState: product;
    setProductState: React.Dispatch<React.SetStateAction<product>>;
}

function AddReview({ productState, setProductState }: props) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { data: session } = useSession();

    const handleStarClick = (starIndex: number) => {
        setRating(starIndex + 1);
    };

    function getTodaysDate() {
        const currentDate = new Date();
        const options = { month: "long", day: "numeric", year: "numeric" };
        const formattedDate = currentDate.toLocaleDateString(
            "en-US",
            options as any
        );
        return formattedDate;
    }

    const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session) return toast.error("You are not logged in!");
        if (!rating)
            return toast.error(
                "Please rate this product before submitting a review."
            );

        const newReview = {
            rating: rating as 1 | 2 | 3 | 4 | 5,
            reviewText: comment,
            user: session?.user?.name as string,
            createdAt: getTodaysDate(),
        };
        const res = await axios.patch(
            `/api/products/${productState._id}/reviews`,
            newReview
        );
        if (res.status === 200) {
            setProductState({
                ...productState,
                reviews: [...productState.reviews!, newReview],
            });
            setComment("");
            setRating(0);
            updateStat(session?.user?.email!, "reviewsLeft");
        }
    };

    return (
        <section className="font-mulish text-lg my-6 ">
            <h3 className="font-mulish font-semibold uppercase">
                add a review
            </h3>
            <p className="text-gray-400 my-2">
                Your email address will not be published. Required fields are
                marked with "<span className="text-red-600"> * </span>"
            </p>
            <form onSubmit={submitReview}>
                <div>
                    <span className="text-gray-700">
                        Your rating<span className="text-red-600">*</span>
                    </span>
                    <div className="flex text-brown my-2">
                        {[...Array(5)].map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleStarClick(index)}
                            >
                                {index < rating ? (
                                    <AiFillStar size={20} />
                                ) : (
                                    <AiOutlineStar size={20} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="comment" className="text-gray-700">
                        Your comment
                    </label>
                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        name="comment"
                        id="comment"
                        className="border border-zinc-300 w-full p-3 mt-1 mb-3 h-72"
                    />
                </div>
                <button
                    type="submit"
                    className="text-zinc-50 bg-zinc-900 px-10 py-4 text-sm tracking-widest hover:bg-brown transition-colors duration-500 uppercase"
                >
                    submit
                </button>
            </form>
        </section>
    );
}

export default AddReview;
