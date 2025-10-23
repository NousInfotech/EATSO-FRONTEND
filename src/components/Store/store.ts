import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import reviewsReducer from "./reviewSlice"; // ✅ Add this import

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    reviews: reviewsReducer, // ✅ Add reviews reducer
  },
});

// ✅ Subscribe to store changes and persist to localStorage
store.subscribe(() => {
  if (typeof window !== "undefined") {
    const state = store.getState();

    // Persist cart state
    localStorage.setItem("cartState", JSON.stringify(state.cart));

    // Persist reviews state
    localStorage.setItem("reviewsState", JSON.stringify(state.reviews.reviews));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
