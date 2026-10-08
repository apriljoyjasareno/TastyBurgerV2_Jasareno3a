export interface Burger {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number; // 0–5, supports halves
  image: string;
}

export interface CartTotals {
  count: number;
  total: number;
}