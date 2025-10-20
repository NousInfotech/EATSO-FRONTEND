"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Store/store";
import { removeFromCart, updateQty } from "../Store/cartSlice";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [mounted, setMounted] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading your cart...
      </div>
    );

  // Empty cart
  if (!cart.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShoppingCart size={64} className="text-gray-400 mb-4" />
        <p className="text-xl text-gray-400 mb-6">Your cart is empty</p>
        <Link
          href="/"
          className="px-6 py-2 bg-primary text-foreground font-bold rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );

  // Totals
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  // Remove item
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    setConfirmId(null);
  };

  // Update qty
  const changeQty = (id: string, qty: number) => {
    if (qty >= 1) dispatch(updateQty({ id, qty }));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="mx-auto px-4 py-6 flex items-center gap-4">
        <Link href="/">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-2xl">Your Cart</h1>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 px-4">
        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-start relative"
            >
              <Image
                src={item.images[0]}
                alt={item.name}
                width={1080}
                height={720}
                className="w-full h-full object-cover rounded-lg"
              />

              <div className="flex-1 w-full space-y-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.category}</p>

                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary">₹{item.price}</span>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => changeQty(item.id, item.qty + 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => setConfirmId(item.id)}
                    className="text-red-500 hover:scale-110 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {confirmId === item.id && (
                <ConfirmDialog
                  message={`Remove "${item.name}" from cart?`}
                  onConfirm={() => handleRemove(item.id)}
                  onCancel={() => setConfirmId(null)}
                />
              )}
            </div>
          ))}
        </div>

        <hr className="text-primary" />

        {/* Summary */}
        <div className=" border border-gray-300 rounded-lg p-6 h-fit space-y-4 sticky top-24">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="space-y-2 border-b pb-4 text-sm">
            <SummaryRow label="Subtotal" value={subtotal} />
            <SummaryRow label="Delivery" value={delivery} />
            <SummaryRow label="Tax (5%)" value={tax} />
          </div>
          <SummaryRow label="Total" value={total} bold />

          <Link
            href="#"
            className="block text-center w-full py-3 bg-primary text-foreground rounded-lg font-semibold"
          >
            Proceed to Order
          </Link>
          <Link
            href="/"
            className="block text-center w-full py-3 border border-primary rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    </div>
  );
}

// ✅ Helper Component
const SummaryRow = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: number;
  bold?: boolean;
}) => (
  <div
    className={`flex justify-between ${
      bold ? "text-lg font-bold text-primary" : ""
    }`}
  >
    <span>{label}</span>
    <span>₹{value}</span>
  </div>
);
