import { createContext, useContext, useState, useCallback } from 'react';
import {
  getCart as apiGetCart,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
} from './api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const refresh = useCallback(async () => {
    const data = await apiGetCart();
    setItems(data || []);
  }, []);

  const add = useCallback(async (productId) => {
    const data = await apiAddToCart(productId);
    setItems(data || []);
  }, []);

  const remove = useCallback(async (productId) => {
    const data = await apiRemoveFromCart(productId);
    setItems(data || []);
  }, []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const value = { items, count, total, refresh, add, remove };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
