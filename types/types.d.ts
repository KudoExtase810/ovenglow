type product = {
    _id: string;
    title: string;
    category: string;
    tags: string[];
    price: number;
    salePrice: number | undefined;
    description: string | undefined;
    image: string;
    reviews?: {
        rating: 1 | 2 | 3 | 4 | 5;
        reviewText: string;
        user: string;
        createdAt: string;
    }[];
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    quantity: number;
    amountInCart: number;
};

type user = {
    _id: string;
    username: string;
    email: string;
    password?: string;
    isAdmin: boolean;
    phone: string;
    stats: {
        totalSpent: number;
        ordersPlaced: number;
        reviewsLeft: number;
    };
};

type message = {
    _id: string;
    username: string;
    email: string;
    content: string;
    createdAt: string;
    isSeen: boolean;
};

type order = {
    _id: string;
    customer: { name: string; email: string; phone?: string };
    total: number;
    orderedProducts: {
        name: string;
        quantity: number;
        price: number;
        image: string;
    }[];
    shouldDeliver: boolean;
    isPaid: boolean;
    isSeen: boolean;
    createdAt: string;
    status: "Ordered" | "Preparing" | "Ready" | "On the way" | "Delivered";
};
