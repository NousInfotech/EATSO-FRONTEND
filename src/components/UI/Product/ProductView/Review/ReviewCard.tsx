"use client";

import { useState } from "react";
import Image from "next/image";
import { StarDisplay, StarInput } from "./StarRating";

interface ReviewCardProps {
  review: {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
    images?: string[];
  };
  onHelpful: (id: string) => void;
  onEdit: (id: string, rating: number, comment: string) => void;
  onDelete: (id: string) => void;
}

export const ReviewCard = ({
  review,
  onHelpful,
  onEdit,
  onDelete,
}: ReviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(review.rating);
  const [editComment, setEditComment] = useState(review.comment);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const validateEdit = () => {
    const newErrors: { [key: string]: string } = {};
    if (editRating === 0) newErrors.rating = "Please select a rating";
    if (!editComment.trim() || editComment.trim().length < 10)
      newErrors.comment = "Review must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveEdit = () => {
    if (!validateEdit()) return;
    onEdit(review.id, editRating, editComment.trim());
    setIsEditing(false);
    setErrors({});
  };

  const handleDelete = () => {
    onDelete(review.id);
    setShowDeleteConfirm(false);
  };

  if (isEditing) {
    return (
      <div className="border-b border-gray-200 py-6 last:border-b-0">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">Edit Review</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating *</label>
            <StarInput rating={editRating} onRatingChange={setEditRating} />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Your Review *
            </label>
            <textarea
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveEdit}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 py-6 last:border-b-0">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {review.userAvatar ? (
            <Image
              src={review.userAvatar}
              alt={review.userName}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              {review.userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
          <StarDisplay rating={review.rating} />
          <p className="text-gray-700 mt-3">{review.comment}</p>
          {review.images && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {review.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Review image ${idx + 1}`}
                  width={100}
                  height={100}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              ))}
            </div>
          )}
          <button
            onClick={() => onHelpful(review.id)}
            className="mt-4 text-sm text-gray-600 hover:text-primary"
          >
            Helpful ({review.helpful})
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-bold mb-2">Delete Review</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this review? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
