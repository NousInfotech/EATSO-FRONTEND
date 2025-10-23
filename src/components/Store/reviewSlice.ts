import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

interface ReviewsState {
  reviews: Review[];
}

// Load initial state from localStorage
const loadReviewsFromStorage = (): Review[] => {
  if (typeof window !== "undefined") {
    const savedReviews = localStorage.getItem("reviewsState");
    if (savedReviews) {
      try {
        return JSON.parse(savedReviews);
      } catch (error) {
        console.error("Error loading reviews from localStorage:", error);
        return [];
      }
    }
  }
  return [];
};

const initialState: ReviewsState = {
  reviews: loadReviewsFromStorage(),
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (
      state,
      action: PayloadAction<Omit<Review, "id" | "date" | "helpful">>
    ) => {
      const newReview: Review = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        helpful: 0,
      };
      state.reviews.unshift(newReview);
    },

    markHelpful: (state, action: PayloadAction<string>) => {
      const review = state.reviews.find((r) => r.id === action.payload);
      if (review) {
        review.helpful += 1;
      }
    },

    editReview: (
      state,
      action: PayloadAction<{ id: string; rating: number; comment: string }>
    ) => {
      const review = state.reviews.find((r) => r.id === action.payload.id);
      if (review) {
        review.rating = action.payload.rating;
        review.comment = action.payload.comment;
        review.date =
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) + " (edited)";
      }
    },

    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    },

    clearProductReviews: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter(
        (r) => r.productId !== action.payload
      );
    },
  },
});

export const {
  addReview,
  markHelpful,
  editReview,
  deleteReview,
  clearProductReviews,
} = reviewsSlice.actions;
export default reviewsSlice.reducer;
