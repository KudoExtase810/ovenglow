import { BiEdit } from "react-icons/bi";
import Image from "next/image";

interface props {
    product: product;
    setShowEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
    setClickedProduct: React.Dispatch<
        React.SetStateAction<product | undefined>
    >;
}

function SingleProduct({
    product,
    setShowEditProduct,
    setClickedProduct,
}: props) {
    const { title, price, salePrice, image } = product;

    return (
        <li className="flex flex-col w-max justify-center items-center gap-1">
            <button
                id="edit"
                className="mb-2"
                aria-label="edit product"
                onClick={() => {
                    setClickedProduct(product);
                    setShowEditProduct(true);
                }}
            >
                <div className="relative aspect-square w-[320px] max-[1725px]:w-[300px] max-[1625px]:w-[280px] max-2xl:w-[295px] max-xl:w-[320px] max-lg:w-[360px] max-md:w-[300px] max-sm:w-[500px] max-[550px]:w-[320px]">
                    <Image
                        src={image}
                        fill
                        alt={title}
                        className="rounded-md object-cover"
                    />
                    <div className="absolute inset-0 flex justify-center items-center bg-zinc-700 opacity-0 hover:opacity-80 transition-all duration-500 rounded-md">
                        <BiEdit size={72} color="white" />
                    </div>
                </div>
            </button>

            <span className="font-cormorant font-bold text-zinc-900 text-xl uppercase mt-1">
                {title}
            </span>
            <div className="font-semibold font-mulish text-lg">
                <span
                    className={`${
                        salePrice ? "text-zinc-400 line-through" : "text-brown"
                    }`}
                >
                    ${price?.toFixed(2)}
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

export default SingleProduct;
