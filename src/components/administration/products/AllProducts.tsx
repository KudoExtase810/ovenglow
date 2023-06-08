import { useState } from "react";
import SingleProduct from "./SingleProduct";
import { GrAddCircle } from "react-icons/gr";
import { useRouter } from "next/router";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface props {
    products: product[];
    setShowEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
    setClickedProduct: React.Dispatch<
        React.SetStateAction<product | undefined>
    >;
}

function AllProducts({
    products,
    setShowEditProduct,
    setClickedProduct,
}: props) {
    const [isHovered, setIsHovered] = useState(false);

    const router = useRouter();

    const [parent] = useAutoAnimate();

    return (
        <ul
            ref={parent}
            className="grid grid-cols-5 w-max gap-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-xl:gap-4 max-lg:grid-cols-2 max-md:gap-3 max-sm:gap-4 max-sm:grid-cols-1 mb-6"
        >
            {products.map((product) => (
                <SingleProduct
                    key={product._id}
                    product={product}
                    setShowEditProduct={setShowEditProduct}
                    setClickedProduct={setClickedProduct}
                />
            ))}
            <div className="w-[320px] aspect-square max-[1725px]:w-[300px] max-[1625px]:w-[280px] max-2xl:w-[295px] max-xl:w-[320px] max-lg:w-[360px] max-md:w-[300px] max-sm:w-[500px] max-[550px]:w-[320px] ">
                <button
                    onClick={() => router.push("products/add")}
                    aria-label="add a new product"
                    className="w-full h-full bg-zinc-200 rounded-md"
                    onMouseOver={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <GrAddCircle
                        className={`text-[145px] m-auto transition-all duration-500 ${
                            isHovered && "text-[180px]"
                        }`}
                    />
                </button>
            </div>
        </ul>
    );
}

export default AllProducts;
