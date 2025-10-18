"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/components/Store/cartSlice";
import { Product } from "@/types";
import StarRating from "./StarRating";
import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

// AddToCartButton Component
const AddToCartButton = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(addToCart(product));
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    },
    [dispatch, product]
  );

  return (
    <button
      onClick={handleAddToCart}
      className={`px-4 py-2 rounded-lg font-semibold text-sm transition duration-300 transform hover:scale-105 ${
        isAdded
          ? "bg-primary text-foreground shadow-md"
          : "bg-primary text-foreground hover:bg-primary shadow-sm hover:shadow-md"
      }`}
    >
      {isAdded ? (
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Added
        </span>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
};

// ProductImage Component
const ProductImage = ({ product }: { product: Product }) => (
  <Link href={`/${generateSlug(product.name)}`}>
    <div className="w-full h-45 md:h-60 bg-gray-200 overflow-hidden">
      <Image
        width={1080}
        height={720}
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  </Link>
);

// ProductInfo Component
const ProductInfo = ({ product }: { product: Product }) => {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => setPrice(product.price), [product.price]);

  return (
    <div className="p-3 md:p-4">
      <p className="text-xs md:text-sm text-gray-500 font-medium">
        {product.category}
      </p>

      <h3 className="text-sm md:text-base font-semibold text-foreground mb-2 truncate">
        {product.name}
      </h3>

      <div className="mb-2">
        <StarRating rating={product.rating} reviews={product.reviews} />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg md:text-xl font-bold text-primary">
          ₹{price}
        </span>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

// Main ProductCard Component
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="px-5">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer duration-300">
        <ProductImage product={product} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
