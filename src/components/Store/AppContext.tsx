"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product, PageType } from "@/types";

interface AppContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  viewProduct: Product | null;
  setViewProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  return (
    <AppContext.Provider
      value={{ currentPage, setCurrentPage, viewProduct, setViewProduct }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
