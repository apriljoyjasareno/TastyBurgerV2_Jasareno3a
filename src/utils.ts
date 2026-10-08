const CURRENCY = "\u09F3"; // ৳

export const money = (n: number): string => `${CURRENCY}${n.toFixed(2)}`;

export function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  const empty = 5 - full - (half ? 1 : 0);

  let html = "";
  for (let i = 0; i < full; i++) html += "\u2605"; // ★
  if (half) html += "\u2BE8"; // half star glyph fallback
  for (let i = 0; i < empty; i++) html += "<span class=\"empty\">\u2605</span>";
  return html;
}

// Get an element by id, or throw a clear error if it is missing.
export function $<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el as T;
}