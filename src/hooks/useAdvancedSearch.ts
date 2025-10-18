"use client";

import { useState, useCallback } from "react";
import { Product } from "@/types";

export function useAdvancedSearch(
  products: Product[],
  handlers: {
    onSearch: (query: string) => void;
    onCategoryFilter: (category: string | null) => void;
    onPriceFilter: (minPrice: number, maxPrice: number) => void;
    onRatingFilter: (minRating: number) => void;
  }
) {
  const { onSearch, onCategoryFilter, onPriceFilter, onRatingFilter } =
    handlers;

  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const maxPrice = Math.max(...products.map((p) => p.price));

  const hasActiveFilters =
    query ||
    selectedCategory ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    ratingFilter > 0;

  const handleSearchChange = useCallback(
    (value: string) => {
      setQuery(value);
      onSearch(value);

      if (value.trim()) {
        const filtered = products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(value.toLowerCase()) ||
              p.category.toLowerCase().includes(value.toLowerCase())
          )
          .map((p) => p.name)
          .slice(0, 5);

        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    },
    [products, onSearch]
  );

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    onCategoryFilter(category);
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    onPriceFilter(newRange[0], newRange[1]);
  };

  const handleRatingChange = (rating: number) => {
    setRatingFilter(rating);
    onRatingFilter(rating);
  };

  const handleClearFilters = () => {
    setQuery("");
    setSelectedCategory(null);
    setPriceRange([0, maxPrice]);
    setRatingFilter(0);
    onSearch("");
    onCategoryFilter(null);
    onPriceFilter(0, maxPrice);
    onRatingFilter(0);
  };

  return {
    state: {
      query,
      showFilters,
      selectedCategory,
      priceRange,
      ratingFilter,
      suggestions,
      showSuggestions,
      maxPrice,
      categories: [...new Set(products.map((p) => p.category))],
      hasActiveFilters,
    },
    handlers: {
      setShowFilters,
      handleSearchChange,
      handleSuggestionClick,
      handleCategoryChange,
      handlePriceChange,
      handleRatingChange,
      handleClearFilters,
    },
  };
}
