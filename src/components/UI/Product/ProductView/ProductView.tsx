"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

import StarRating from "../ProductCard/StarRating";
import QuantitySelector from "../ProductCard/QuantitySelector";
import AddToCartButton from "../ProductCard/AddToCartButton";

// ✅ Product Images Component
const ProductImages = ({
  images,
  mainImage,
  setMainImage,
}: {
  images: string[];
  mainImage: number;
  setMainImage: (idx: number) => void;
}) => (
  <div className="space-y-4 animate-slide-in-left bg-gradient-to-b from-primary from-50% px-5 pb-5 pt-20">
    <div className="w-full h-80 rounded-lg overflow-hidden">
      <Image
        width={1080}
        height={720}
        src={images[mainImage]}
        alt={`Product Image ${mainImage}`}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex gap-3 scrollbar-hide overflow-x-auto pb-2">
      {images.map((img, idx) => (
        <button
          key={idx}
          onClick={() => setMainImage(idx)}
          className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 ${
            idx === mainImage ? "border-primary" : "border-gray-300"
          }`}
        >
          <Image
            width={1080}
            height={720}
            src={img}
            alt={`View ${idx}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  </div>
);

// ✅ Action Buttons Component
interface ActionButtonsProps {
  product: Product;
  qty: number;
}

const ActionButtons = ({ product, qty }: ActionButtonsProps) => (
  <div className="grid grid-cols-2 gap-3">
    <AddToCartButton product={product} qty={qty} />
    <Link
      href={"/"}
      type="button"
      className="w-full bg-primary text-foreground px-4 py-2 rounded-lg text-center"
    >
      Back to Home
    </Link>
  </div>
);

// ✅ Product Details Component
interface ProductDetailsProps {
  product: Product;
  qty: number;
  setQty: (val: number) => void;
  onContinue: () => void;
}

const ProductDetails = ({ product, qty, setQty }: ProductDetailsProps) => (
  <div className="space-y-6 animate-slide-in-right px-5">
    {/* Product Info */}
    <div>
      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
      <h1 className="text-3xl font-bold text-foreground mb-4">
        {product.name}
      </h1>
      <div className="mb-4">
        <StarRating
          rating={product.rating}
          reviews={product.reviews}
          size="lg"
        />
      </div>
      <p className="text-gray-500">{product.description}</p>
    </div>

    {/* Price */}
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="text-gray-500 text-sm mb-2">Price</p>
      <p className="text-3xl font-bold text-primary">₹{product.price}</p>
    </div>

    {/* Preparation Time */}
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <p className="text-sm mb-1">Preparation Time</p>
      <p className="font-semibold">{product.prepTime}</p>
    </div>

    {/* Quantity Selector & Action Buttons */}
    <div className="space-y-4 pt-4 border-t">
      <div className="flex items-center gap-4">
        <span className="font-semibold">Quantity:</span>
        <QuantitySelector qty={qty} setQty={setQty} />
      </div>

      <ActionButtons product={product} qty={qty} />
    </div>
  </div>
);

// ✅ Main ProductView Component
interface ProductViewProps {
  product: Product;
}

const ProductView = ({ product }: ProductViewProps) => {
  const router = useRouter();
  const [mainImage, setMainImage] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <main className="max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <ProductImages
          images={product.images}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
        <ProductDetails
          product={product}
          qty={qty}
          setQty={setQty}
          onContinue={() => router.push("/")}
        />
      </div>
    </main>
  );
};

export default ProductView;
