import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string, color: string) => void;
  increaseQuantity: (id: string, size: string, color: string) => void;
  decreaseQuantity: (id: string, size: string, color: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find(
          (i) => i.id === item.id && i.size === item.size && i.color === item.color
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.size === item.size && i.color === item.color
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (id, size, color) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.size === size && item.color === color)
          ),
        });
      },

      increaseQuantity: (id, size, color) => {
        set({
          items: get().items.map((item) =>
            item.id === id && item.size === size && item.color === color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decreaseQuantity: (id, size, color) => {
        const items = get().items;
        const item = items.find(
          (i) => i.id === id && i.size === size && i.color === color
        );

        if (item && item.quantity > 1) {
          set({
            items: items.map((i) =>
              i.id === id && i.size === size && i.color === color
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          });
        } else {
          // Remove item if quantity would be 0
          set({
            items: items.filter(
              (i) => !(i.id === id && i.size === size && i.color === color)
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'zanori-cart-storage',
    }
  )
);

