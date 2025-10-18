import { useMemo } from "react";
import { Product } from "@/types";

interface UseFilterProps {
  products: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  priceRange: [number, number];
  ratingFilter: number;
}

export const useFilter = ({
  products,
  selectedCategory,
  searchQuery,
  priceRange,
  ratingFilter,
}: UseFilterProps) => {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === null || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= ratingFilter;

      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });
  }, [products, selectedCategory, searchQuery, priceRange, ratingFilter]);

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  return {
    filteredProducts,
    categories,
    totalResults: filteredProducts.length,
  };
};
