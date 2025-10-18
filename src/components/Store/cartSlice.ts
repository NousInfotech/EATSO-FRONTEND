import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "@/types";

const initialState: CartState = {
  cart: [],
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.qty += 1;
        state.cartCount += 1;
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
        state.cartCount += 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        state.cartCount -= item.qty;
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },
    updateQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        if (action.payload.qty <= 0) {
          state.cartCount -= item.qty;
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
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
