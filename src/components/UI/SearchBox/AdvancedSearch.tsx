"use client";

import { Search, X, Filter } from "lucide-react";
import { Product } from "@/types";
import CategoryTags from "../Tags/Tags";
import { useAdvancedSearch } from "@/hooks/useAdvancedSearch";

interface AdvancedSearchProps {
  products: Product[];
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string | null) => void;
  onPriceFilter: (minPrice: number, maxPrice: number) => void;
  onRatingFilter: (minRating: number) => void;
}

export default function AdvancedSearch({
  products,
  onSearch,
  onCategoryFilter,
  onPriceFilter,
  onRatingFilter,
}: AdvancedSearchProps) {
  const { state, handlers } = useAdvancedSearch(products, {
    onSearch,
    onCategoryFilter,
    onPriceFilter,
    onRatingFilter,
  });

  const {
    query,
    showFilters,
    selectedCategory,
    priceRange,
    ratingFilter,
    suggestions,
    showSuggestions,
    maxPrice,
    categories,
    hasActiveFilters,
  } = state;

  const {
    setShowFilters,
    handleSearchChange,
    handleSuggestionClick,
    handleCategoryChange,
    handlePriceChange,
    handleRatingChange,
    handleClearFilters,
  } = handlers;

  return (
    <div className="w-full animate-slide-in-up px-5 space-y-4">
      {/* Search bar */}
      <div className="relative flex gap-2">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name, category, or ingredients..."
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => query && setShowFilters(true)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-[#FAB12F]/20 bg-white text-foreground placeholder-gray-400 transition"
          />
          {query && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(sug)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition flex items-center gap-2 text-foreground"
                >
                  <Search size={16} className="text-gray-400" />
                  {sug}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3 md:px-6 rounded-lg font-semibold transition ${
            showFilters || hasActiveFilters
              ? "bg-primary text-foreground shadow-md border border-primary"
              : "text-foreground border border-primary"
          }`}
        >
          <Filter
            size={18}
            className={`${
              showFilters || hasActiveFilters
                ? "text-foreground"
                : "text-primary"
            }`}
          />
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6 animate-slide-in-up">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-3">Category</h3>
            <CategoryTags
              categories={categories}
              selected={selectedCategory}
              onSelect={handleCategoryChange}
            />
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-3">
              Price Range
            </h3>
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) =>
                  handlePriceChange([parseInt(e.target.value), priceRange[1]])
                }
                className="w-full"
              />
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceChange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 bg-white p-3 rounded border border-gray-300">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-3">
              Minimum Rating
            </h3>
            <div className="flex gap-2">
              {[0, 3, 3.5, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`px-3 py-2 rounded-lg font-medium transition ${
                    ratingFilter === rating
                      ? "bg-primary text-foreground"
                      : "bg-white border border-gray-300 text-foreground hover:border-primary"
                  }`}
                >
                  {rating === 0 ? "All" : `⭐ ${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:brightness-95 transition"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Category Tags below panel */}
      <CategoryTags
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategoryChange}
      />
    </div>
  );
}
