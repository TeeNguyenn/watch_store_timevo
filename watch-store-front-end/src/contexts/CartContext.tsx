import React, { useState } from 'react';
import { createContext } from 'react';

interface CartContextType {
    cart: boolean;
    handleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: JSX.Element | string;
}

const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState(false);

    const handleCart = () => {
        setCart(!cart);
    };
    const value = {
        cart,
        handleCart,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export { CartContext, CartProvider };
