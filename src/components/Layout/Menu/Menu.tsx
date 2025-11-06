"use client";

import { useState } from "react";
import { products as allProducts } from "@/lib/data"; // static array
import { useFilter } from "@/hooks/useFilter"; // your custom hook
import Banner from "@/components/UI/Banner/Banner";
import AdvancedSearch from "@/components/UI/SearchBox/AdvancedSearch";
import ProductCard from "@/components/UI/Product/ProductCard/ProductCard";
import Banner2 from "@/components/UI/Banner/Banner2";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);

  // -------------------------
  // Use custom filter hook
  // -------------------------
  const { filteredProducts, totalResults } = useFilter({
    products: allProducts,
    selectedCategory,
    searchQuery,
    priceRange,
    ratingFilter,
  });

  // -------------------------
  // Main Content
  // -------------------------
  return (
    <main className="space-y-5">
      <Banner />
      <Banner2 />
      <AdvancedSearch
        products={allProducts}
        onSearch={setSearchQuery}
        onCategoryFilter={setSelectedCategory}
        onPriceFilter={(min, max) => setPriceRange([min, max])}
        onRatingFilter={setRatingFilter}
      />

      <h2 className="text-xl md:text-2xl font-bold px-5 mb-4 mt-5 animate-slide-in-up">
        {selectedCategory || "All Items"} ({totalResults})
      </h2>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-4 animate-slide-in-up">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg mb-2">No items found</p>
          <p className="text-gray-400 text-sm">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </main>
  );
};

export default Menu;
