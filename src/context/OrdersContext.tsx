import { createContext, useContext, useState } from "react";

type OrderContextProviderProps = {
    children: React.ReactNode;
};

type OrderContext = {
    orders: order[] | undefined;
    setOrders: React.Dispatch<React.SetStateAction<order[] | undefined>>;
    showFullOrder: boolean;
    setShowFullOrder: React.Dispatch<React.SetStateAction<boolean>>;
    clickedOrder: order | undefined;
    setClickedOrder: React.Dispatch<React.SetStateAction<order | undefined>>;
};

const OrdersContext = createContext({} as OrderContext);

export const useOrders = () => useContext(OrdersContext);

function OrderContextProvider({ children }: OrderContextProviderProps) {
    const [orders, setOrders] = useState<order[]>();

    // Full order modal
    const [showFullOrder, setShowFullOrder] = useState(false);
    const [clickedOrder, setClickedOrder] = useState<order>();

    const ctxValue = {
        orders,
        setOrders,
        showFullOrder,
        setShowFullOrder,
        clickedOrder,
        setClickedOrder,
    };
    return (
        <OrdersContext.Provider value={ctxValue}>
            {children}
        </OrdersContext.Provider>
    );
}
export default OrderContextProvider;
