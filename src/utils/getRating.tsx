import { AiFillStar } from "react-icons/ai";

const getRating = (stars: 1 | 2 | 3 | 4 | 5, starSize?: number) => {
    const totalStars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= stars!) {
            totalStars.push(
                <AiFillStar
                    key={i}
                    size={starSize || 24}
                    className="text-brown"
                />
            );
        } else {
            totalStars.push(
                <AiFillStar
                    key={i}
                    size={starSize || 24}
                    className="text-zinc-700"
                />
            );
        }
    }
    return totalStars;
};
export default getRating;
