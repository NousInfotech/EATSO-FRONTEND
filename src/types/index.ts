export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  prepTime: string;
  qty?: number;
  images: string[];
  ingredients: string[];
}

export interface CartItem extends Product {
  qty: number;
}

export interface CartState {
  cart: CartItem[];
  cartCount: number;
}

export type PageType = "home" | "cart" | "view";
