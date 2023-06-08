import ItemList from "@/components/shop/ItemList";
import axios from "axios";

interface props {
    products: product[];
    categories: string[];
}

function shop({ products, categories }: props) {
    return (
        <>
            <ItemList products={products} categories={categories} />
        </>
    );
}

export async function getServerSideProps() {
    const response1 = await axios.get(
        `https://ovenglow.vercel.app/api/products`
    );
    const products = response1.data;

    const response2 = await axios.get(
        `https://ovenglow.vercel.app/api/general/categories`
    );
    const categories = response2.data.categories;
    return {
        props: {
            products,
            categories,
        },
    };
}

export default shop;
