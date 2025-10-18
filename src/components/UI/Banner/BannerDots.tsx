"use client";

interface Props {
  count: number;
  current: number;
  onSelect: (index: number) => void;
}

export default function BannerDots({ count, current, onSelect }: Props) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`h-2 rounded-full transition ${
            idx === current ? "bg-primary w-6" : "bg-white/60 w-2"
          }`}
        />
      ))}
    </div>
  );
}
