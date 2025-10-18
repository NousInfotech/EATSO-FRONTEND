"use client";

import ProductView from "@/components/UI/Product/ProductView/ProductView";
import { products } from "@/lib/data";
import { generateSlug } from "@/lib/utils";
import { useParams } from "next/navigation";
import React from "react";

const MenuItem = () => {
  const params = useParams(); // returns { slug: "product-name" }
  const { menuItem } = params;
  const product = products.find((p) => generateSlug(p.name) === menuItem);
  if (!product) {
    return <p>Product not found</p>;
  }
  return <ProductView product={product} />;
};

export default MenuItem;
