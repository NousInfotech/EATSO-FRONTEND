"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, User, ArrowLeft } from "lucide-react";
import type { RootState } from "../Store/store";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);

  const [isMounted, setIsMounted] = useState(false);

  // ✅ Prevent hydration mismatch by waiting for client mount
  useEffect(() => setIsMounted(true), []);

  // 🔹 Hide header on cart page
  if (pathname === "/cart") return null;

  const isNotHome = pathname !== "/";

  return (
    <header className="absolute top-0 z-10 w-full">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1440px] mx-auto">
        {/* Back Button */}
        {isNotHome && (
          <button onClick={() => router.back()} aria-label="Go Back">
            <ArrowLeft size={24} color="white" />
          </button>
        )}

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-semibold text-white hover:brightness-110 transition"
        >
          Cloud Kitchen
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* User Icon */}
          <button
            aria-label="User Account"
            className="rounded-full p-1 hover:bg-primary/20 transition"
          >
            <User size={24} color="white" />
          </button>

          {/* Cart Icon */}
          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative rounded-full p-1 hover:bg-primary/20 transition"
          >
            <ShoppingCart size={24} color="white" />

            {/* Cart Badge */}
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
