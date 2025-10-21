// QuantitySelector.tsx
"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  qty: number;
  setQty: (val: number) => void;
  maxQty?: number; // optional max limit
}

const QuantitySelector = ({
  qty,
  setQty,
  maxQty = 10,
}: QuantitySelectorProps) => {
  const handleDecrease = () => setQty(Math.max(1, qty - 1));
  const handleIncrease = () => setQty(Math.min(maxQty, qty + 1));

  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-1 border border-primary">
      <button onClick={handleDecrease} className="hover:bg-gray-200 rounded">
        <Minus size={20} />
      </button>
      <span className="w-8 text-center">{qty}</span>
      <button onClick={handleIncrease} className="rounded">
        <Plus size={20} />
      </button>
    </div>
  );
};

export default QuantitySelector;
