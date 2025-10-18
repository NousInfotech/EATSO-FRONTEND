"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Store/store";
import { removeFromCart, updateQty } from "../Store/cartSlice";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryCharge = 40;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryCharge + tax;

  if (!cart.length) return <EmptyCart />;

  const summaryItems: SummaryItem[] = [
    { label: "Subtotal", value: totalPrice },
    { label: "Delivery", value: deliveryCharge },
    { label: "Tax (5%)", value: tax },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader />
      <main className="max-w-7xl mx-auto px-4 py-6 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CartItems cart={cart} dispatch={dispatch} />
        <OrderSummary summaryItems={summaryItems} total={finalTotal} />
      </main>
    </div>
  );
}

// ✅ Types
interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  images: string[];
}

interface SummaryItem {
  label: string;
  value: number;
}

interface CartItemsProps {
  cart: CartItem[];
  dispatch: AppDispatch;
}

interface QuantitySelectorProps {
  item: CartItem;
  dispatch: AppDispatch;
}

// ✅ Empty Cart Component
const EmptyCart = () => (
  <div className="min-h-screen flex flex-col">
    <CartHeader />
    <main className="flex-1 flex flex-col items-center justify-center px-4">
      <ShoppingCart size={64} className="text-gray-400 mb-4" />
      <p className="text-xl text-gray-400 mb-6">Your cart is empty</p>
      <Link
        href="/"
        className="px-6 py-2 bg-primary text-foreground font-bold rounded-lg"
      >
        Continue Shopping
      </Link>
    </main>
  </div>
);

// ✅ Header Component
const CartHeader = () => (
  <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
      <Link href="/">
        <ArrowLeft size={24} />
      </Link>
      <h1 className="text-2xl">Your Cart</h1>
    </div>
  </header>
);

// ✅ Cart Items List
const CartItems = ({ cart, dispatch }: CartItemsProps) => (
  <div className="lg:col-span-2 space-y-4">
    {cart.map((item) => (
      <div
        key={item.id}
        className="bg-white border border-gray-400 rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-start"
      >
        <Image
          width={1080}
          height={720}
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 w-full">
          <div className="space-y-0.5">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.category}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-primary text-lg">
              ₹{item.price}
            </span>
            <QuantitySelector item={item} dispatch={dispatch} />
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 ml-2"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ✅ Quantity Selector
const QuantitySelector = ({ item, dispatch }: QuantitySelectorProps) => (
  <div className="flex items-center gap-2">
    <button
      onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      disabled={item.qty <= 1}
    >
      −
    </button>
    <span className="w-8 text-center">{item.qty}</span>
    <button
      onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
    >
      +
    </button>
  </div>
);

// ✅ Order Summary using map
const OrderSummary = ({
  summaryItems,
  total,
}: {
  summaryItems: SummaryItem[];
  total: number;
}) => (
  <div className="border border-gray-400 rounded-lg p-6 lg:sticky lg:top-24 space-y-4">
    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
    <div className="space-y-4 mb-6 pb-6 border-b">
      {summaryItems.map((item) => (
        <div key={item.label} className="flex justify-between text-sm">
          <span>{item.label}</span>
          <span className="font-semibold">₹{item.value}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-between items-center mb-6">
      <span className="font-bold text-lg">Total</span>
      <span className="text-2xl font-bold text-primary">₹{total}</span>
    </div>
    <Link
      href="/checkout"
      className="w-full bg-primary text-foreground py-3 rounded-lg mb-3 hover:bg-primary flex justify-center"
    >
      Proceed to Order
    </Link>
    <Link
      href="/"
      className="w-full py-3 rounded-lg border border-primary flex justify-center"
    >
      Continue Shopping
    </Link>
  </div>
);
