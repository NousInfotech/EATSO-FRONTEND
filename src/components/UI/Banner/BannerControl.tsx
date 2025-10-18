"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

export default function BannerControls({ onPrev, onNext }: Props) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-background p-2 rounded-full z-10 transition transform hover:scale-110"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={onNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-background p-2 rounded-full z-10 transition transform hover:scale-110"
      >
        <ChevronRight size={20} />
      </button>
    </>
  );
}
