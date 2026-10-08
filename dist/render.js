import { burgers } from "./data.js";
import { state, getBurger, cartTotals } from "./state.js";
import { $ } from "./utils.js";
import { appTemplate, thumbTemplate, featuredTemplate, sideItemTemplate, menuItemTemplate, cartPopupTemplate, cartModalTemplate, allBurgersTemplate, } from "./components.js";
// Render = put the HTML from components.ts onto the page.
export function renderApp() {
    $("app").innerHTML = appTemplate();
    renderMenu();
    renderShop();
    renderCart();
}
export function renderMenu() {
    $("menuList").innerHTML = burgers.map(menuItemTemplate).join("");
}
export function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
export function renderShop() {
    $("thumbs").innerHTML = burgers.map(thumbTemplate).join("");
    $("featured").innerHTML = featuredTemplate(getBurger(state.selectedId));
    $("sideList").innerHTML = burgers
        .filter((b) => b.id !== state.selectedId)
        .slice(0, 2)
        .map(sideItemTemplate)
        .join("");
}
export function renderCart() {
    $("cartCount").textContent = String(cartTotals().count);
    $("cartPopup").innerHTML = cartPopupTemplate();
}
export function renderQty() {
    $("qtyValue").textContent = String(state.qty);
}
export function toggleCartPopup(show) {
    const popup = $("cartPopup");
    popup.hidden = show === undefined ? !popup.hidden : !show;
}
// ----- Pop-up modal -----
function openModal(title, bodyHtml) {
    $("modalTitle").textContent = title;
    $("modalBody").innerHTML = bodyHtml;
    $("modal").hidden = false;
    document.body.classList.add("no-scroll");
}
export function closeModal() {
    $("modal").hidden = true;
    document.body.classList.remove("no-scroll");
}
export function openCartModal() {
    openModal("Your Cart", cartModalTemplate());
}
export function openAllBurgersModal() {
    openModal("All Burgers", allBurgersTemplate(burgers));
}
//# sourceMappingURL=render.js.map