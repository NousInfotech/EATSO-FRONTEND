export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};

export const getProductLink = (productName: string): string => {
  const slug = generateSlug(productName);
  return `/product/${slug}`;
};
