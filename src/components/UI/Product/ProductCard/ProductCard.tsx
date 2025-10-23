"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { generateSlug } from "@/lib/utils";
import StarRating from "./StarRating";
import AddToCartButton from "./AddToCartButton";
import QuantitySelector from "./QuantitySelector";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [qty, setQty] = useState(1); // always 1 initially

  return (
    <div className="px-5">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer duration-300">
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

          <div className="flex flex-col justify-between gap-3">
            <div className="flex justify-between items-center gap-2">
              <span className="text-lg md:text-xl font-bold text-primary">
                ₹{product.price}
              </span>
              <QuantitySelector qty={qty} setQty={setQty} maxQty={10} />
            </div>
            <AddToCartButton product={product} qty={qty} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
