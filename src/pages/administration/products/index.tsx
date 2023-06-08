import Link from "next/link";
import AllProducts from "../../../components/administration/products/AllProducts";
import { useState, useMemo, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import EditProduct from "@/components/administration/products/EditProduct";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

interface props {
    allProducts: product[];
}

function products({ allProducts }: props) {
    const [products, setProducts] = useState(allProducts);

    const [showEditProduct, setShowEditProduct] = useState(false);
    const [clickedProduct, setClickedProduct] = useState<product>();

    const [query, setQuery] = useState("");

    const filteredProducts = useMemo(() => {
        if (!query) return products;
        return products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
    }, [products, query]);

    useEffect(() => {
        document.body.classList.toggle("overflow-y-hidden");
    }, [showEditProduct]);

    return (
        <>
            {showEditProduct && (
                <EditProduct
                    products={products}
                    setProducts={setProducts}
                    setShowEditProduct={setShowEditProduct}
                    clickedProduct={clickedProduct}
                    setClickedProduct={setClickedProduct}
                />
            )}
            <div className="flex flex-col items-center w-fit mx-auto">
                <div className="flex justify-between sm:items-center w-full max-sm:flex-col max-sm:mb-4">
                    <h2 className="font-cormorant uppercase font-bold text-zinc-950 text-3xl my-5">
                        all products
                    </h2>
                    <div className="flex items-center max-sm:flex-row-reverse">
                        <Link href="/administration/products/add">
                            <IoMdAdd
                                className="text-zinc-950 hover:text-zinc-800"
                                size={42}
                            />
                        </Link>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            maxLength={64}
                            placeholder="Search.."
                            type="search"
                            name="search"
                            className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 px-4 py-2 transition-colors duration-500 placeholder:text-zinc-700 max-sm:w-full"
                        />
                    </div>
                </div>
                <AllProducts
                    products={filteredProducts}
                    setShowEditProduct={setShowEditProduct}
                    setClickedProduct={setClickedProduct}
                />
            </div>
        </>
    );
}
export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const session = await getSession(context.res);

    if (!session?.user.isAdmin) {
        throw new Error("You don't have permission to access this page!");
    }

    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
    );
    const products = response.data;
    return {
        props: { allProducts: products },
    };
};

export default products;
