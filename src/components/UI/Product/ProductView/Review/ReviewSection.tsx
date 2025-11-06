"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/components/Store/store";
import {
  markHelpful,
  editReview,
  deleteReview,
} from "@/components/Store/reviewSlice";
import { ReviewCard } from "./ReviewCard";
import { AddReviewForm } from "./AddReviewForm";
import { StarDisplay } from "./StarRating";

// Types
interface ReviewSectionProps {
  productId: string;
}

export const ReviewStats = ({
  reviews,
}: {
  reviews: Array<{ rating: number }>;
}) => {
  const avgRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;
  // const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
  //   star,
  //   count: reviews.filter((r) => r.rating === star).length,
  //   percentage:
  //     reviews.length > 0
  //       ? (reviews.filter((r) => r.rating === star).length / reviews.length) *
  //         100
  //       : 0,
  // }));

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <h3 className="text-5xl font-bold text-gray-900">
            {avgRating.toFixed(1)}
          </h3>
          <StarDisplay rating={Math.round(avgRating)} />
          <p className="text-gray-600">
            Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>
        {/* <div className="space-y-2">
          {ratingCounts.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm font-medium w-12">{star} star</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-40 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const [sortBy, setSortBy] = useState<
    "recent" | "helpful" | "highest" | "lowest"
  >("recent");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const allReviews = useSelector((state: RootState) => state.reviews.reviews);
  const productReviews = allReviews.filter((r) => r.productId === productId);

  const handleHelpful = (id: string) => dispatch(markHelpful(id));
  const handleEdit = (id: string, rating: number, comment: string) =>
    dispatch(editReview({ id, rating, comment }));
  const handleDelete = (id: string) => dispatch(deleteReview(id));

  const sortedReviews = [...productReviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful - a.helpful;
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "recent":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  if (!isMounted)
    return (
      <div className="py-12 text-center text-gray-400">
        Loading customer reviews...
      </div>
    );

  return (
    <section className="mt-12 px-5">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      <ReviewStats reviews={productReviews} />
      <AddReviewForm productId={productId} onSubmit={() => {}} />
      {productReviews.length > 0 && (
        <div className="flex items-center gap-2 mt-10">
          <label className="text-sm font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="border border-primary px-2 py-1 rounded-[5px] outline-none"
          >
            <option value="recent" className="text-gray-700 text-[10px]">
              Most Recent
            </option>
            <option value="helpful" className="text-gray-700 text-[10px]">
              Most Helpful
            </option>
            <option value="highest" className="text-gray-700 text-[10px]">
              Highest Rating
            </option>
            <option value="lowest" className="text-gray-700 text-[10px]">
              Lowest Rating
            </option>
          </select>
        </div>
      )}
      <div className="bg-white rounded-lg">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onHelpful={handleHelpful}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No reviews yet.</p>
            <p className="text-sm mt-2">Be the first to review this product!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
