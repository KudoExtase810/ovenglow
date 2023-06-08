import SingleItem from "./SingleItem";
import { useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface props {
    products: product[];
    categories: string[];
}

type sortMethod = "default" | "price" | "rating" | "alphabetical";

function ItemList({ products, categories }: props) {
    const [allProducts, setAllProducts] = useState<product[]>(products);
    const [filteredProducts, setFilteredProducts] =
        useState<product[]>(products);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [selectedSortMethod, setSelectedSortMethod] =
        useState<sortMethod>("default");

    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(
                (product) => product.category === selectedCategory
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [selectedCategory, products]);

    useEffect(() => {
        let sortedProducts: product[] = [...filteredProducts];

        switch (selectedSortMethod) {
            case "default":
                setAllProducts([...allProducts]);
                break;
            case "price":
                sortedProducts.sort((a, b) => {
                    const priceA = a.salePrice || a.price;
                    const priceB = b.salePrice || b.price;
                    return priceA - priceB;
                });
                break;
            case "rating":
                sortedProducts.sort((a, b) => b.rating! - a.rating!);
                break;
            case "alphabetical":
                sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        setAllProducts(sortedProducts);
    }, [selectedSortMethod, filteredProducts]);

    const handleSort = (sortMethod: sortMethod) => {
        setSelectedSortMethod(sortMethod);
    };

    const filterByCategory = (category: string) => {
        setSelectedCategory(category);
    };

    const clearFilters = () => {
        handleSort("default");
        setSelectedCategory(null);
    };

    const [parent] = useAutoAnimate();

    return (
        <div className="flex gap-9 my-8 justify-center max-md:flex-col max-md:items-center">
            {filteredProducts.length !== 0 ? (
                <div className="w-max">
                    <div className="flex justify-between font-mulish items-center mb-5 max-[875px]:justify-end">
                        <span className="max-[875px]:hidden">{`Showing 1-${
                            filteredProducts.length <= 12
                                ? filteredProducts.length
                                : 12
                        } of ${filteredProducts.length} results`}</span>
                        <div className="flex gap-2 text-sm max-[400px]:flex-col max-[400px]:w-full">
                            <select
                                className="border border-zinc-300 pl-4 pr-8 py-2 cursor-pointer tracking-wider "
                                name="sorting method"
                                value={selectedSortMethod}
                                onChange={(e) =>
                                    handleSort(e.target.value as sortMethod)
                                }
                            >
                                <option value="default">DEFAULT SORTING</option>
                                <option value="price">SORT BY PRICE</option>
                                <option value="rating">SORT BY RATING</option>
                                <option value="alphabetical">
                                    SORT ALPHABETICALLY
                                </option>
                            </select>
                            <button
                                className="text-white bg-zinc-900 px-4 hover:text-red-600 max-[400px]:py-2"
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                    <ul
                        className="grid grid-cols-3 w-max gap-5 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:mx-auto"
                        ref={parent}
                    >
                        {allProducts.map((product) => (
                            <SingleItem key={product._id} product={product} />
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-xl font-mulish my-auto md:mr-8">
                    <p className="text-center">
                        Sorry, we couldn't find any products that belong to this
                        category.
                    </p>
                    <button
                        className="text-white bg-zinc-900 py-3 px-6 hover:text-red-600 mx-auto block mt-6"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            )}
            <div className="max-md:mr-auto max-md:ml-4">
                <h3 className="font-cormorant font-bold text-zinc-900 text-2xl uppercase mb-4">
                    categories
                </h3>
                <ul className="flex flex-col gap-3">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className="font-mulish text-lg flex gap-3 items-center"
                        >
                            <div className="bg-brown h-[1px] w-[12px]"></div>
                            <button
                                className={`hover:text-brown transition-colors duration-300 ${
                                    selectedCategory === category
                                        ? "text-brown"
                                        : ""
                                }`}
                                onClick={() => filterByCategory(category)}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ItemList;
