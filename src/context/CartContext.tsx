import { createContext, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";

type CartContext = {
    cartItems: product[];
    setCartItems: React.Dispatch<React.SetStateAction<product[]>>;
};

type CartContextProviderProps = {
    children: React.ReactNode;
};

const CartContext = createContext<CartContext>({} as CartContext);

export const useCart = () => useContext(CartContext);

function CartContextProvider({ children }: CartContextProviderProps) {
    const [cartItems, setCartItems] = useLocalStorageState<product[]>("cart", {
        defaultValue: [] as product[],
    });

    const ctxValue = { cartItems, setCartItems };
    return (
        <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
}
export default CartContextProvider;
