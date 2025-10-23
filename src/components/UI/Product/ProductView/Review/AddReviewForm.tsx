"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "@/components/Store/reviewSlice";
import { StarInput } from "./StarRating";

interface AddReviewFormProps {
  productId: string;
  onSubmit: () => void;
}

export const AddReviewForm = ({ productId, onSubmit }: AddReviewFormProps) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!userName.trim()) newErrors.userName = "Name is required";
    if (rating === 0) newErrors.rating = "Please select a rating";
    if (!comment.trim())
      newErrors.comment = "Review must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(
      addReview({
        productId,
        userName: userName.trim(),
        rating,
        comment: comment.trim(),
      })
    );
    setUserName("");
    setRating(0);
    setComment("");
    setIsOpen(false);
    setErrors({});
    onSubmit();
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-6 py-3 rounded-lg"
      >
        Write a Review
      </button>
    );

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-4">Write Your Review</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Name *</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.userName && (
          <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rating *</label>
        <StarInput rating={rating} onRatingChange={setRating} />
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Review *</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
        )}
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg"
        >
          Submit Review
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            setErrors({});
          }}
          className="bg-gray-300 px-6 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
