import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "@/types";

// ✅ Load from localStorage (only on client)
const loadCart = (): CartState => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("cartState");
    if (saved) return JSON.parse(saved);
  }
  return { cart: [], cartCount: 0 };
};

const initialState: CartState = loadCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      const addQty = action.payload.qty ?? 1; // ✅ use selected qty or default 1

      if (existing) {
        // ✅ Add the selected quantity (but limit to 10)
        const newQty = Math.min(existing.qty + addQty, 10);
        state.cartCount += newQty - existing.qty;
        existing.qty = newQty;
      } else {
        // ✅ Add new product with selected qty
        const initialQty = Math.min(addQty, 10);
        state.cart.push({ ...action.payload, qty: initialQty });
        state.cartCount += initialQty;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        state.cartCount -= item.qty;
        state.cart = state.cart.filter((i) => i.id !== action.payload);
      }
    },
    updateQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.qty <= 0) {
          state.cartCount -= item.qty;
          state.cart = state.cart.filter((i) => i.id !== action.payload.id);
        } else {
          state.cartCount += action.payload.qty - item.qty;
          item.qty = action.payload.qty;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
