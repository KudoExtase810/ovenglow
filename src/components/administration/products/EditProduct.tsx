import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import FocusTrap from "focus-trap-react";
interface props {
    setShowEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
    clickedProduct: product | undefined;
    setClickedProduct: React.Dispatch<
        React.SetStateAction<product | undefined>
    >;
    products: product[];
    setProducts: React.Dispatch<React.SetStateAction<product[]>>;
}

type FormValues = {
    price: number;
    salePrice: number | undefined;
    quantity: number;
    category: string;
    description: string | undefined;
};

function EditProduct({
    setShowEditProduct,
    clickedProduct,
    setClickedProduct,
    products,
    setProducts,
}: props) {
    const { register, handleSubmit, formState } = useForm<FormValues>({
        defaultValues: {
            price: clickedProduct?.price,
            salePrice: clickedProduct?.salePrice,
            quantity: clickedProduct?.quantity,
            category: clickedProduct?.category,
            description: clickedProduct?.description,
        },
    });

    const saveChanges = async (data: FormValues) => {
        if (!formState.isDirty) return setShowEditProduct(false);
        if (data.salePrice && data.salePrice >= data.price)
            return toast.error(
                "The discounted price must be lower than the original one!"
            );
        const newData = {
            newPrice: data.price,
            newSalePrice: data.salePrice,
            newQuantity: data.quantity,
            newCategory: data.category,
            newDescription: data.description,
        };
        const res = await axios.put(
            `/api/products/${clickedProduct!._id}/`,
            newData
        );
        if (res.status === 200) {
            toast.success(
                <span>
                    <b>{clickedProduct?.title}</b> was updated successfully.
                </span>
            );
            const updatedProduct = products.find(
                (product) => product._id === clickedProduct?._id
            );
            updatedProduct!.price = data.price;
            updatedProduct!.salePrice = data.salePrice || undefined;
            updatedProduct!.quantity = data.quantity;
            updatedProduct!.category = data.category;
            updatedProduct!.description = data.description;
            setProducts([...products]);
            setShowEditProduct(false);
        } else toast.error("Failed to updated product.");
    };

    const [allCategories, setAllCategories] = useState<string[]>([]);
    useEffect(() => {
        const getAllCategories = async () => {
            const res = await axios.get("/api/general/categories");
            setAllCategories(res.data.categories as string[]);
        };
        getAllCategories();
    }, []);

    return (
        <FocusTrap className="">
            <div
                tabIndex={-1}
                className="relative z-10 "
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 overflow-y-auto animate-fade-down animate-duration-500">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                        <div className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all min-[730px]:my-8 min-[730px]:w-full min-[730px]:max-w-2xl">
                            <div className="bg-white p-6">
                                <button
                                    type="button"
                                    aria-label="close"
                                    className="absolute right-3 top-3 hover:text-zinc-400"
                                    onClick={() => {
                                        setShowEditProduct(false);
                                        setClickedProduct(undefined);
                                    }}
                                >
                                    <AiOutlineClose size={22} />
                                </button>
                                <h2 className="text-2xl font-bold text-zinc-950 font-cormorant uppercase mb-2">
                                    edit product{" "}
                                </h2>
                                <form
                                    onSubmit={handleSubmit(saveChanges)}
                                    className="flex flex-col gap-3 font-mulish max-[550px]:w-[310px]"
                                    noValidate
                                >
                                    <div className="flex gap-4 max-[550px]:flex-col max-[550px]:gap-2">
                                        <div className="flex flex-col gap-1 w-full">
                                            <label htmlFor="price">Price</label>
                                            <input
                                                {...register("price", {
                                                    valueAsNumber: true,
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Price is required!",
                                                    },
                                                    min: {
                                                        value: 0.2,
                                                        message:
                                                            "Price is too low!",
                                                    },
                                                    max: {
                                                        value: 60,
                                                        message:
                                                            "Price is too high!",
                                                    },
                                                })}
                                                id="price"
                                                type="number"
                                                className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 p-2 transition-colors duration-500"
                                            />
                                            <p className="text-red-600 text-sm">
                                                {
                                                    formState.errors.price
                                                        ?.message
                                                }
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1 w-full">
                                            <label htmlFor="saleprice">
                                                Discounted price
                                            </label>
                                            <input
                                                {...register("salePrice", {
                                                    valueAsNumber: true,
                                                    min: {
                                                        value: 0.2,
                                                        message:
                                                            "Discounted price is too low!",
                                                    },
                                                    max: {
                                                        value: 60,
                                                        message:
                                                            "Discounted price is too high!",
                                                    },
                                                })}
                                                id="saleprice"
                                                placeholder="Leave blank if the product is not on sale"
                                                type="number"
                                                className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 p-2 transition-colors duration-500"
                                            />
                                            <p className="text-red-600 text-sm">
                                                {
                                                    formState.errors.salePrice
                                                        ?.message
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 max-[550px]:flex-col max-[550px]:gap-2">
                                        <div className="flex flex-col gap-1 w-1/3 max-[550px]:w-full">
                                            <label htmlFor="quantity">
                                                Quantity left
                                            </label>
                                            <input
                                                {...register("quantity", {
                                                    valueAsNumber: true,
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Quantity is required!",
                                                    },
                                                    min: {
                                                        value: 0,
                                                        message:
                                                            "Quantity cannot be less than 0!",
                                                    },
                                                })}
                                                id="quantity"
                                                type="number"
                                                className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 p-2 transition-colors duration-500"
                                            />
                                            <p className="text-red-600 text-sm">
                                                {
                                                    formState.errors.quantity
                                                        ?.message
                                                }
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1 w-2/3 max-[550px]:w-full">
                                            <label htmlFor="category">
                                                Category
                                            </label>
                                            <select
                                                {...register("category", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Category is required!",
                                                    },
                                                })}
                                                className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 p-2 transition-colors duration-500"
                                                name="category"
                                                id="category"
                                            >
                                                {allCategories.map(
                                                    (category) => (
                                                        <option
                                                            value={category}
                                                            selected={
                                                                category ===
                                                                clickedProduct!
                                                                    .category
                                                            }
                                                        >
                                                            {category}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            <p className="text-red-600 text-sm">
                                                {
                                                    formState.errors.category
                                                        ?.message
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            {...register("description", {
                                                maxLength: 512,
                                            })}
                                            id="description"
                                            className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 p-2 transition-colors duration-500 h-32"
                                        />
                                    </div>
                                    <button
                                        disabled={!formState.isDirty}
                                        type="submit"
                                        className="uppercase disabled:bg-gray-400 text-zinc-50 bg-zinc-900 px-12 py-4 text-sm tracking-widest w-fit hover:bg-brown transition-colors duration-300 mt-1"
                                    >
                                        save changes
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FocusTrap>
    );
}

export default EditProduct;
