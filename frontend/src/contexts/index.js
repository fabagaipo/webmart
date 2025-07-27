import { useContext } from 'react';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext';
import { ProductsContext } from './ProductsContext';
import { NotificationContext } from './NotificationContext';

const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within UserProvide');
    }
    return context;
};

const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

const useProductsContext = () => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProductsContext must be used within ProductsProvider')
    }
    return context
}
export { useCartContext, useUserContext, useProductsContext, useNotifications };
