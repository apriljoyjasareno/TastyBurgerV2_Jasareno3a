import { selectBurger, changeQty, addToCart, removeFromCart } from "./state.js";
import { $ } from "./utils.js";
import {
  renderShop,
  scrollToSection,
  renderCart,
  renderQty,
  toggleCartPopup,
  closeModal,
  openCartModal,
  openAllBurgersModal,
} from "./render.js";

// One case per button (each button has a data-action in the HTML).
function handleAction(action: string, id?: string): void {
  switch (action) {
    case "select":
      if (!id) return;
      selectBurger(id);
      closeModal();
      renderShop();
      break;
    case "order": // from the Our Menu list: pick it, then jump to the Shop section
      if (!id) return;
      selectBurger(id);
      renderShop();
      scrollToSection("shop");
      break;
    case "qty-plus":
      changeQty(1);
      renderQty();
      break;
    case "qty-minus":
      changeQty(-1);
      renderQty();
      break;
    case "add":
      addToCart();
      renderQty();
      renderCart();
      $("cartButton").animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.2)" }, { transform: "scale(1)" }],
        { duration: 220, easing: "ease-out" }
      );
      break;
    case "toggle-cart":
      toggleCartPopup();
      break;
    case "cart-view-all":
      toggleCartPopup(false);
      openCartModal();
      break;
    case "remove":
      if (!id) return;
      removeFromCart(id);
      renderCart();
      openCartModal();
      break;
    case "view-all":
      openAllBurgersModal();
      break;
    case "close-modal":
      closeModal();
      break;
  }
}

export function bindEvents(): void {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    // click on the dark backdrop closes the modal
    if (target.id === "modal") closeModal();

    // click anywhere outside the cart closes the cart popup
    if (!target.closest(".cart-wrap")) toggleCartPopup(false);

    const el = target.closest<HTMLElement>("[data-action]");
    if (el) handleAction(el.dataset.action ?? "", el.dataset.id);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      toggleCartPopup(false);
    }
  });
}