"use client";

interface CategoryTagsProps {
  categories: string[];
  className?: string;
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryTags({
  categories,
  selected,
  className,
  onSelect,
}: CategoryTagsProps) {
  return (
    <div className="overflow-x-auto overflow-y-hidden md:mx-0 md:px-0 animate-slide-in-up">
      <div className={`flex gap-3 ${className}`}>
        <button
          onClick={() => onSelect(null)}
          className={`px-4 py-1 rounded-[10px] whitespace-nowrap font-medium transition-all duration-200 cursor-pointer border border-primary ${
            selected === null
              ? "bg-primary text-foreground shadow-md"
              : "text-foreground"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-1 rounded-[10px] whitespace-nowrap font-medium transition-all duration-200 cursor-pointer border border-primary ${
              selected === cat
                ? "bg-primary text-foreground shadow-md"
                : "text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
