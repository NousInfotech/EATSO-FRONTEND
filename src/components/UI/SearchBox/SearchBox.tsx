"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full animate-slide-in-up">
      <Search
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
        size={20}
      />

      <input
        type="text"
        placeholder="Search items..."
        value={query}
        onChange={handleChange}
        className="w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-[#FAB12F]/20 bg-white text-foreground  transition"
      />

      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
