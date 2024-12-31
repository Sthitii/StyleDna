'use client';
import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  isCartOpen: false,

  toggleCart: () => set((state) => ({ 
    isCartOpen: !state.isCartOpen 
  })),

  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }
    return {
      items: [...state.items, { ...product, quantity: 1 }]
    };
  }),

  removeItem: (productId) => set((state) => {
    const newItems = state.items.filter(item => item.id !== productId);
    // If cart becomes empty, close sidebar
    if (newItems.length === 0) {
      return {
        items: [],
        isCartOpen: false
      };
    }
    return { items: newItems };
  }),

  updateQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      return get().removeItem(productId);
    }
    return {
      items: state.items.map(item =>
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    };
  }),

  getTotalItems: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}));

export default useCartStore;