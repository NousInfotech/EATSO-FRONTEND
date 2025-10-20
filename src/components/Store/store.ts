import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  if (typeof window !== "undefined") {
    const state = store.getState().cart;
    localStorage.setItem("cartState", JSON.stringify(state));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
