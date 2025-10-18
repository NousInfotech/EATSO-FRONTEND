"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
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

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={iconSize} className="text-primary fill-current" />
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
