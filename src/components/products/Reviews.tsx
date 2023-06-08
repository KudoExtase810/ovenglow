import getRating from "@/utils/getRating";
import { FaUserCircle } from "react-icons/fa";

interface props {
    reviews: product["reviews"];
}

function Reviews({ reviews }: props) {
    return (
        //! add max height
        <div className="max-h-[400px] overflow-y-auto border-b border-gray-200">
            <ul className="font-mulish flex flex-col gap-5 pb-3">
                {reviews!.map((review) => (
                    <li className="flex gap-4 items-center">
                        <FaUserCircle className="text-zinc-900 min-h-[80px] min-w-[80px]" />
                        <div>
                            <span className="flex">
                                {getRating(
                                    review.rating as 1 | 2 | 3 | 4 | 5,
                                    18
                                )}
                            </span>
                            <div className="text-zinc-700">
                                <b>{review.user}</b>{" "}
                                <span>- {review.createdAt}</span>
                            </div>
                            <p className="text-gray-600">
                                {review.reviewText || (
                                    <span className="text-red-500">
                                        No comment left.
                                    </span>
                                )}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Reviews;
