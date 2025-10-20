"use client";

import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/components/Store/cartSlice";
import { Product } from "@/types";
import StarRating from "./StarRating";
import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/lib/utils";
import { TiTick } from "react-icons/ti";

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
      className={`px-4 py-2 rounded-lg text-sm ${
        isAdded
          ? "bg-primary text-foreground shadow-md"
          : "bg-primary text-foreground shadow-sm"
      }`}
    >
      {isAdded ? (
        <span className="flex items-center gap-1">
          <TiTick size={20} />
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
    <div className="w-full h-45 md:h-60 overflow-hidden">
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
  return (
    <div className="p-3 md:p-4">
      <p className="text-xs md:text-sm text-gray-500 font-medium mb-1">
        {product.category}
      </p>

      <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
        {product.name}
      </h3>

      <div className="mb-2">
        <StarRating rating={product.rating} reviews={product.reviews} />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg md:text-xl font-bold text-primary">
          ₹{product.price}
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
