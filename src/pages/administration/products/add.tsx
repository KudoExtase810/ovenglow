import { BsInfoCircleFill } from "react-icons/bs";
import { MdOutlineAddCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddCategory from "@/components/administration/products/AddCategory";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

type FormValues = {
    title: string;
    price: number;
    salePrice: number | undefined;
    description: string | undefined;
    category: string;
    quantity: number;
};

function add() {
    const { register, handleSubmit, formState } = useForm<FormValues>();
    const [tags, setTags] = useState<string[]>([]);
    let image: string = "";
    const [productImage, setProductImage] = useState<File>();

    const router = useRouter();

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", productImage!);
        formData.append("upload_preset", "ovenglow");

        const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;
        const response = await axios.post(URL, formData);
        const imageURL = response.data.secure_url;
        image = imageURL;
    };

    // to show the user a loading spinner while the product is being uploaded
    const [uploading, setUploading] = useState(false);

    const createProduct = async (data: FormValues) => {
        if (data.salePrice && data.salePrice >= data.price)
            return toast.error(
                "The discounted price must be lower than the original one!"
            );
        if (!productImage) return toast.error("No image uploaded!");
        setUploading(true);
        const URL = "/api/products";
        await uploadImage();
        const response = await axios.post(URL, {
            title: data.title,
            price: data.price,
            salePrice: data.salePrice,
            description: data.description,
            category: data.category,
            quantity: data.quantity,
            tags,
            image,
        });
        setUploading(false);
        if (response.status === 201) {
            toast.success("Product created successfully.");
            const newProduct: product = response.data.newProduct;
            router.push(`/products/${newProduct._id}`);
        } else {
            toast.error("Failed to create a new product. Try again later.");
        }
    };

    const [showAddCategory, setShowAddCategory] = useState(false);

    const [allCategories, setAllCategories] = useState<string[]>([]);
    useEffect(() => {
        const getCategories = async () => {
            const URL = "/api/general/categories";
            const response = await axios.get(URL);
            const categories = response.data.categories;
            setAllCategories(categories);
        };
        getCategories();
    }, []);

    useEffect(() => {
        if (showAddCategory || uploading)
            document.body.classList.add("overflow-y-hidden");
        else document.body.classList.remove("overflow-y-hidden");
    }, [showAddCategory, uploading]);

    return (
        <div className="my-8 mx-4">
            {showAddCategory && (
                <AddCategory
                    setShowAddCategory={setShowAddCategory}
                    allCategories={allCategories}
                    setAllCategories={setAllCategories}
                />
            )}
            {uploading && (
                <div className="fixed h-screen w-screen z-40 inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex justify-center items-center">
                    <LoadingSpinner />
                </div>
            )}
            <h2 className="font-cormorant font-semibold text-3xl text-zinc-950 my-4 uppercase">
                add a new product
            </h2>
            <div className="font-mulish text-lg text-zinc-600 mb-3">
                <p className="mb-1">
                    Fill in the necessary information about the product you want
                    to add.
                </p>
                <p>
                    Required fields are marked with "
                    <span className="text-red-600"> * </span>"
                </p>
            </div>
            <form
                onSubmit={handleSubmit(createProduct)}
                noValidate
                className="flex flex-col gap-3 max-w-5xl"
            >
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="title"
                        className="text-lg font-mulish text-zinc-950"
                    >
                        Title<span className="text-red-600">*</span>
                    </label>
                    <input
                        {...register("title", {
                            required: {
                                value: true,
                                message: "Title is required!",
                            },
                            maxLength: {
                                value: 64,
                                message: "Title is too long!",
                            },
                            minLength: {
                                value: 3,
                                message: "Title is too short!",
                            },
                        })}
                        placeholder="Apple pie"
                        type="text"
                        id="title"
                        className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 px-2 py-4 transition-colors duration-500"
                    />
                    <p className="text-red-600 text-sm">
                        {formState.errors.title?.message}
                    </p>
                </div>

                <div className="flex max-sm:justify-between sm:gap-4 w-full">
                    <div className="flex flex-col gap-1 w-[49.5%] max-sm:w-[48%]">
                        <label
                            htmlFor="price"
                            className="text-lg font-mulish text-zinc-950"
                        >
                            Price<span className="text-red-600">*</span>
                            <small>(USD)</small>
                        </label>
                        <input
                            {...register("price", {
                                valueAsNumber: true,
                                required: {
                                    value: true,
                                    message: "Price is required!",
                                },
                                min: {
                                    value: 0.2,
                                    message: "Price is too low!",
                                },
                                max: {
                                    value: 60,
                                    message: "Price is too high!",
                                },
                            })}
                            placeholder="16"
                            type="number"
                            id="price"
                            className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 px-2 py-4 transition-colors duration-500"
                        />
                        <p className="text-red-600 text-sm">
                            {formState.errors.price?.message}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 w-[49.5%] max-sm:w-[48%]">
                        <label
                            htmlFor="discounted"
                            className="text-lg font-mulish text-zinc-950"
                        >
                            Discounted Price
                        </label>

                        <input
                            {...register("salePrice", {
                                valueAsNumber: true,
                                min: {
                                    value: 0.2,
                                    message: "Discounted price is too low!",
                                },
                                max: {
                                    value: 60,
                                    message: "Discounted price is too high!",
                                },
                            })}
                            placeholder="12"
                            type="number"
                            id="salePrice"
                            className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 px-2 py-4 transition-colors duration-500"
                        />
                        <p className="text-red-600 text-sm">
                            {formState.errors.salePrice?.message}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="description"
                        className="text-lg font-mulish text-zinc-950"
                    >
                        Description
                    </label>
                    <textarea
                        {...register("description", {
                            maxLength: {
                                value: 364,
                                message: "Description is too long!",
                            },
                        })}
                        placeholder="Delight in a spiced apple pie with flaky crust, perfect for fall and festivities. Savor every warm, cozy bite!"
                        id="description"
                        name="description"
                        className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 px-2 py-4 transition-colors duration-500"
                        cols={30}
                        rows={5}
                    />
                    <p className="text-red-600 text-sm">
                        {formState.errors.description?.message}
                    </p>
                </div>
                <div className="flex gap-4 w-full max-sm:flex-col">
                    <div className="flex flex-col gap-1 sm:w-3/5">
                        <div className="flex gap-1 items-center">
                            <label
                                htmlFor="category"
                                className="text-lg font-mulish text-zinc-950"
                            >
                                Category
                                <span className="text-red-600">*</span>
                            </label>
                            <button
                                type="button"
                                aria-label="add a new category"
                                onClick={() => setShowAddCategory(true)}
                            >
                                <MdOutlineAddCircle
                                    className="text-zinc-950 mt-[3px]"
                                    size={22}
                                />
                            </button>
                        </div>
                        {/*//todo add dynamic categories */}
                        <select
                            {...register("category", {
                                required: {
                                    value: true,
                                    message: "Category is required!",
                                },
                            })}
                            placeholder="1"
                            id="category"
                            className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 px-2 py-4 transition-colors duration-500"
                        >
                            <option value="" disabled selected>
                                Select a category
                            </option>
                            {allCategories.map((category: string, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <p className="text-red-600 text-sm">
                            {formState.errors.category?.message}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 sm:w-2/5">
                        <label
                            htmlFor="quantity"
                            className="text-lg font-mulish text-zinc-950"
                        >
                            Quantity Available
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            {...register("quantity", {
                                valueAsNumber: true,
                                required: {
                                    value: true,
                                    message: "Quantity is required!",
                                },
                                min: {
                                    value: 0,
                                    message: "Quantity cannot be less than 0!",
                                },
                                max: {
                                    value: 100,
                                    message: "Quantity is too high!",
                                },
                            })}
                            placeholder="6"
                            type="number"
                            id="quantity"
                            className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 px-2 py-4 transition-colors duration-500"
                        />
                        <p className="text-red-600 text-sm">
                            {formState.errors.quantity?.message}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="tags"
                        className="text-lg font-mulish text-zinc-950"
                    >
                        Tags <small>(seprate each by a comma ",")</small>
                    </label>
                    <input
                        onChange={(e) => {
                            const tagsString = e.target.value.replace(
                                /(?<=^|,)\s*[a-z]/g,
                                (match) => match.toUpperCase()
                            );

                            const splitTags = tagsString.split(",");
                            // remove any space from tags
                            const tagsList = splitTags.map((tag) =>
                                tag.replace(/\s/g, "")
                            );
                            setTags(tagsList);
                        }}
                        maxLength={124}
                        placeholder="tag1, tag2, tag3, tag4"
                        type="text"
                        id="tags"
                        name="tags"
                        className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 px-2 py-4 transition-colors duration-500"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="image"
                        className="text-lg font-mulish text-zinc-950"
                    >
                        Image <small>(at least 600x600px)</small>
                    </label>
                    <input
                        required
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            setProductImage(e.target.files![0]);
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="block text-zinc-50 bg-zinc-900 px-12 py-4 text-sm uppercase tracking-widest w-max hover:bg-brown transition-colors duration-300 mr-auto mt-3"
                >
                    add product
                </button>
            </form>
        </div>
    );
}
export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const session = await getSession(context.res);
    if (!session?.user.isAdmin) {
        throw new Error("You don't have permission to access this page!");
    }

    return {
        props: {},
    };
};
export default add;
