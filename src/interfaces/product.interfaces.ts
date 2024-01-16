export interface Product {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: {
    rate?: number;
    count?: number;
  };
}

export interface ProductInitialState {
  products?: Product[]; // data stored from API
  status: "idle" | "loading" | "succeeded" | "failed";
  productDetail?: Product;
  error?: string; // current active car tab index
}
