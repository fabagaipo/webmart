import { useContext } from 'react';
import { CartContext } from './CartContext';
import { toast } from 'react-hot-toast';

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  // Wrap addToCart with toast notification
  const addToCartWithToast = (product, quantity = 1) => {
    context.addToCart(product, quantity);
    toast.success('Item added to cart!', {
      position: 'bottom-center'
    });
  };

  // Wrap updateQuantity with toast notification
  const updateQuantityWithToast = (productId, newQuantity) => {
    context.updateQuantity(productId, newQuantity);
    toast('Quantity updated!', {
      icon: '🛒',
      position: 'bottom-center'
    });
  };

  // Return the context with the wrapped addToCart function
  return {
    ...context,
    addToCart: addToCartWithToast,
    updateQuantity: updateQuantityWithToast,
  };
};