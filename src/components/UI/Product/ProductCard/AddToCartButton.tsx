"use client";

import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/components/Store/cartSlice";
import { Product } from "@/types";
import { TiTick } from "react-icons/ti";
import { RootState } from "@/components/Store/store";
import Toast from "./Toast";
interface AddToCartButtonProps {
  product: Product;
  qty?: number;
}

const AddToCartButton = ({ product, qty = 1 }: AddToCartButtonProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [isAdded, setIsAdded] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const existingItem = cart.find((item) => item.id === product.id);
      const existingQty = existingItem ? existingItem.qty : 0;
      const totalQty = existingQty + qty;

      if (totalQty > 10) {
        setToastMessage("You cannot add more than 10 items of this product.");
        return;
      }

      // --- FIX: dispatch product with the final totalQty so cart reflects selected qty properly ---
      dispatch(addToCart({ ...product, qty: totalQty }));
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    },
    [dispatch, product, qty, cart]
  );

  return (
    <>
      <button
        onClick={handleAddToCart}
        className={`px-4 py-2 rounded-lg text-sm ${
          isAdded
            ? "bg-green-600 text-white shadow-md"
            : "bg-primary text-foreground shadow-sm"
        }`}
      >
        {isAdded ? (
          <span className="flex items-center justify-center gap-1">
            <TiTick size={20} /> Added
          </span>
        ) : (
          `Add to Cart`
        )}
      </button>

      {toastMessage && (
        <Toast
          message={toastMessage}
          duration={2500}
          onClose={() => setToastMessage("")}
        />
      )}
    </>
  );
};

export default AddToCartButton;
