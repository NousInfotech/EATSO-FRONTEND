"use client";

import { ShoppingCart, User, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import type { RootState } from "../Store/store";
import Link from "next/link";

export default function Header() {
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);
  const pathname = usePathname();
  const router = useRouter();

  // Hide navbar on cart page
  if (pathname === "/cart") return null;

  const isNotHome = pathname !== "/";

  return (
    <header className="absolute z-10 w-full top-0">
      <div className="flex justify-between items-center px-6 py-4 max-w-[1440px] mx-auto">
        {isNotHome && (
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} color="white" />
          </button>
        )}

        <Link
          href={"/"}
          className={`text-2xl hover:brightness-120 cursor-pointer text-white`}
        >
          Cloud Kitchen
        </Link>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-primary">
            <User size={24} color="white" />
          </button>

          <Link
            href={"/cart"}
            className="p-2 rounded-full hover:bg-primary relative"
          >
            <ShoppingCart size={24} color="white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
