"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart } from "@/components/Store/cartSlice";
import { Product } from "@/types";
import { Minus, Plus } from "lucide-react";
import StarRating from "../ProductCard/StarRating";
import Image from "next/image";
import type { AppDispatch } from "@/components/Store/store";

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

// ✅ Quantity Selector Component
const QuantitySelector = ({
  qty,
  setQty,
}: {
  qty: number;
  setQty: (val: number) => void;
}) => (
  <div className="flex items-center gap-3 rounded-lg px-4 py-2 border border-primary">
    <button
      onClick={() => setQty(Math.max(1, qty - 1))}
      className="hover:bg-gray-200 rounded"
    >
      <Minus size={20} />
    </button>
    <span className="w-8 text-center">{qty}</span>
    <button onClick={() => setQty(qty + 1)} className="rounded">
      <Plus size={20} />
    </button>
  </div>
);
// ✅ Action Buttons Component
const ActionButtons = ({
  product,
  qty,
  dispatch,
  onContinue,
}: {
  product: Product;
  qty: number;
  dispatch: AppDispatch;
  onContinue: () => void;
}) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // revert after 2 seconds
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={handleAddToCart}
        className="w-full bg-primary text-foreground py-3 rounded-lg"
      >
        {added ? "Added ✓" : `Add ${qty} to Cart`}
      </button>
      <button
        onClick={onContinue}
        className="w-full bg-primary text-foreground py-3 rounded-lg"
      >
        Back to Home
      </button>
    </div>
  );
};

// ✅ Product Details Component
const ProductDetails = ({
  product,
  qty,
  setQty,
  dispatch,
  onContinue,
}: {
  product: Product;
  qty: number;
  setQty: (val: number) => void;
  dispatch: AppDispatch;
  onContinue: () => void;
}) => (
  <div className="space-y-6 animate-slide-in-right px-5">
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

    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="text-gray-500 text-sm mb-2">Price</p>
      <p className="text-3xl font-bold text-primary">₹{product.price}</p>
    </div>

    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <p className="text-sm mb-1">Preparation Time</p>
      <p className="font-semibold">{product.prepTime}</p>
    </div>

    <div className="space-y-4 pt-4 border-t">
      <div className="flex items-center gap-4">
        <span className="font-semibold">Quantity:</span>
        <QuantitySelector qty={qty} setQty={setQty} />
      </div>

      <ActionButtons
        product={product}
        qty={qty}
        dispatch={dispatch}
        onContinue={onContinue}
      />
    </div>
  </div>
);

// ✅ Main ProductView Component
const ProductView = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();
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
          dispatch={dispatch}
          onContinue={() => router.push("/")}
        />
      </div>
    </main>
  );
};

export default ProductView;
