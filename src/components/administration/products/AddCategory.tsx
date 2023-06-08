import axios from "axios";
import FocusTrap from "focus-trap-react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

interface props {
    setShowAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
    allCategories: string[];
    setAllCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

function AddCategory({
    setShowAddCategory,
    allCategories,
    setAllCategories,
}: props) {
    const [newCategory, setNewCategory] = useState<string>("");

    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const URL = "/api/general/categories";
        const response = await axios.patch(URL, { newCategory });
        switch (response.status) {
            case 201:
                toast.success("A new category has been added.");
                setAllCategories([...allCategories, newCategory]);
                break;
            case 422:
                toast.error("This category already exists!");
                break;

            default:
                toast.error("Failed to add category. Try again later.");
                break;
        }
    };

    return (
        <FocusTrap>
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 overflow-y-auto animate-fade-down animate-duration-500">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white p-6">
                                <div className="relative">
                                    <button
                                        type="button"
                                        aria-label="close"
                                        className="absolute -right-2 -top-2 hover:text-zinc-400"
                                        onClick={() =>
                                            setShowAddCategory(false)
                                        }
                                    >
                                        <AiOutlineClose
                                            className=""
                                            size={22}
                                        />
                                    </button>
                                    <h3 className="font-cormorant font-semibold uppercase text-3xl text-zinc-950 mb-1">
                                        add category
                                    </h3>
                                    <p className="text-zinc-600 font-mulish">
                                        Add a new food category in order to
                                        assign it to the product you want to
                                        add.
                                    </p>
                                    <form onSubmit={handleAdd}>
                                        <input
                                            onChange={(e) =>
                                                setNewCategory(
                                                    e.target.value.replace(
                                                        /^[a-z]/,
                                                        (match) =>
                                                            match.toUpperCase()
                                                    )
                                                )
                                            }
                                            value={newCategory}
                                            type="text"
                                            placeholder="e.g. Bread"
                                            className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 p-3 transition-colors duration-500 placeholder:text-zinc-700 w-full my-4"
                                        />
                                        <button
                                            disabled={newCategory.length < 2}
                                            type="submit"
                                            className="text-zinc-50 bg-zinc-900 disabled:bg-gray-400 uppercase px-12 py-4 my-2 text-sm tracking-widest hover:bg-brown transition-colors duration-300"
                                        >
                                            submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FocusTrap>
    );
}

export default AddCategory;
