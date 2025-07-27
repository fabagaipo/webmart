import { createContext, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = useCallback((product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            const newCart = existingItem
                ? prevCart.map((item) =>
                      item.id === product.id
                          ? { ...item, quantity: item.quantity + quantity }
                          : item
                  )
                : [...prevCart, { ...product, quantity }];
            return newCart;
        });

        //Show toast after state update
        toast.success('Item added to cart!', {
            position: 'bottom-center',
            duration: 2000,
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart((prevCart) => {
            const newCart = prevCart.filter((item) => item.id !== productId);
            return newCart;
        });
        toast.success('Item removed from cart', {
            position: 'bottom-center',
            duration: 2000,
        });
    }, []);

    const updateQuantity = useCallback((productId, newQuantity) => {
        if (newQuantity < 1) {
            // Remove the item if quantity is less than 1
            setCart((prevCart) => {
                const newCart = prevCart.filter((item) => item.id !== productId);
                return newCart;
            });
            toast.error('Item removed from cart', {
                position: 'bottom-center',
                duration: 2000,
            });
            return;
        }
        
        setCart((prevCart) => {
            const newCart = prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
            return newCart;
        });
        toast.success(`Updated Item quantity to ${newQuantity}`, {
            position: 'bottom-center',
            duration: 2000,
        });
    }, []);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext };
