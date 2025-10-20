"use client";

import { Star, StarHalf, Star as StarEmpty } from "lucide-react";
import { useEffect, useState } from "react";

interface StarRatingProps {
  rating: number; // e.g., 4.5
  reviews: number;
  size?: "sm" | "lg";
}

export default function StarRating({
  rating,
  reviews,
  size = "sm",
}: StarRatingProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // prevents hydration mismatch

  const iconSize = size === "lg" ? 20 : 14;

  // Calculate full, half, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.2;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={iconSize}
            className="text-primary fill-current"
          />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <StarHalf
            key="half"
            size={iconSize}
            className="text-primary fill-current"
          />
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarEmpty
            key={`empty-${i}`}
            size={iconSize}
            className="text-gray-300"
          />
        ))}
      </div>

      <span
        className={`${size === "lg" ? "text-base" : "text-xs"} text-gray-600`}
      >
        {rating.toFixed(1)}
      </span>
      <span
        className={`${size === "lg" ? "text-base" : "text-xs"} text-gray-500`}
      >
        ({reviews})
      </span>
    </div>
  );
}
