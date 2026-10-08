import { burgers } from "./data.js";
import type { Burger, CartTotals } from "./types.js";

// The data the page needs: what is selected, the quantity, and the cart.
export const state = {
  selectedId: burgers[0].id,
  qty: 1,
  cart: new Map<string, number>(), // burger id -> quantity
};

export function getBurger(id: string): Burger {
  const found = burgers.find((b) => b.id === id);
  if (!found) throw new Error(`Unknown burger: ${id}`);
  return found;
}

export function selectBurger(id: string): void {
  state.selectedId = id;
  state.qty = 1;
}

export function changeQty(delta: number): void {
  state.qty = Math.min(99, Math.max(1, state.qty + delta));
}

export function addToCart(): void {
  const current = state.cart.get(state.selectedId) ?? 0;
  state.cart.set(state.selectedId, current + state.qty);
  state.qty = 1;
}

export function removeFromCart(id: string): void {
  state.cart.delete(id);
}

export function cartTotals(): CartTotals {
  let count = 0;
  let total = 0;
  state.cart.forEach((q, id) => {
    count += q;
    total += q * getBurger(id).price;
  });
  return { count, total };
}