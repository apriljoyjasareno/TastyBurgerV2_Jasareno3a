import { burgers } from "./data.js";
import { state, getBurger, cartTotals } from "./state.js";
import { $ } from "./utils.js";
import {
  appTemplate,
  thumbTemplate,
  featuredTemplate,
  sideItemTemplate,
  menuItemTemplate,
  cartPopupTemplate,
  cartModalTemplate,
  allBurgersTemplate,
} from "./components.js";

// Render = put the HTML from components.ts onto the page.

export function renderApp(): void {
  $("app").innerHTML = appTemplate();
  renderMenu();
  renderShop();
  renderCart();
}

export function renderMenu(): void {
  $("menuList").innerHTML = burgers.map(menuItemTemplate).join("");
}

export function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function renderShop(): void {
  $("thumbs").innerHTML = burgers.map(thumbTemplate).join("");
  $("featured").innerHTML = featuredTemplate(getBurger(state.selectedId));
  $("sideList").innerHTML = burgers
    .filter((b) => b.id !== state.selectedId)
    .slice(0, 2)
    .map(sideItemTemplate)
    .join("");
}

export function renderCart(): void {
  $("cartCount").textContent = String(cartTotals().count);
  $("cartPopup").innerHTML = cartPopupTemplate();
}

export function renderQty(): void {
  $("qtyValue").textContent = String(state.qty);
}

export function toggleCartPopup(show?: boolean): void {
  const popup = $("cartPopup");
  popup.hidden = show === undefined ? !popup.hidden : !show;
}

// ----- Pop-up modal -----
function openModal(title: string, bodyHtml: string): void {
  $("modalTitle").textContent = title;
  $("modalBody").innerHTML = bodyHtml;
  $("modal").hidden = false;
  document.body.classList.add("no-scroll");
}

export function closeModal(): void {
  $("modal").hidden = true;
  document.body.classList.remove("no-scroll");
}

export function openCartModal(): void {
  openModal("Your Cart", cartModalTemplate());
}

export function openAllBurgersModal(): void {
  openModal("All Burgers", allBurgersTemplate(burgers));
}