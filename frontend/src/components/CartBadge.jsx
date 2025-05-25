import { useCart } from '../context/useCart';

function CartBadge() {
  const { cart } = useCart();
  
  if (cart.length === 0) {
    return null;
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {totalItems}
    </span>
  );
}

export default CartBadge;
