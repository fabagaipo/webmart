import { useContext } from 'react';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext';

const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('userUser must be used within UserProvide');
    }
    return context;
};

export { useCart, useUser };
