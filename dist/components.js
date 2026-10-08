import { contact } from "./data.js";
import { money, renderStars } from "./utils.js";
import { state, getBurger, cartTotals } from "./state.js";
export function appTemplate() {
    return `
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="#top">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 64 48" width="44" height="34">
            <path d="M4 20c0-8 12-14 28-14s28 6 28 14H4z" fill="#F4A81D" stroke="#7B3F1D" stroke-width="2"/>
            <rect x="4" y="20" width="56" height="6" fill="#8BC34A" stroke="#7B3F1D" stroke-width="2"/>
            <rect x="4" y="26" width="56" height="8" fill="#E4181A" stroke="#7B3F1D" stroke-width="2"/>
            <path d="M4 34c0 7 12 12 28 12s28-5 28-12H4z" fill="#D89A5A" stroke="#7B3F1D" stroke-width="2"/>
            <circle cx="16" cy="17" r="1.6" fill="#fff"/>
            <circle cx="28" cy="14" r="1.6" fill="#fff"/>
            <circle cx="40" cy="16" r="1.6" fill="#fff"/>
            <circle cx="50" cy="18" r="1.6" fill="#fff"/>
          </svg>
        </span>
        <span class="logo-text">
          <span class="logo-tasty">TASTY</span>
          <span class="logo-burger">BURGER</span>
        </span>
      </a>

      <nav class="main-nav" aria-label="Primary">
        <a href="#about">About</a>
        <a href="#menu">Our Menu</a>
        <a href="#shop">Shop</a>
        <a href="#contact">Contact</a>
      </nav>

      <div class="cart-wrap">
        <button class="cart-btn" id="cartButton" data-action="toggle-cart" aria-label="Cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-1.5 6h11.5M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
          </svg>
          <span class="cart-count" id="cartCount">0</span>
        </button>
        <div class="cart-popup" id="cartPopup" hidden></div>
      </div>
    </div>
  </header>

  <main id="top">
    <section class="hero container">
      <div class="hero-copy">
        <h1>Our Crazy Burgers</h1>
        <p>
          Get ready for a wild ride of flavors! Our crazy burgers are loaded with
          juicy patties, bold toppings, and irresistible sauces, all stacked on a
          perfectly toasted bun. Whether you like it cheesy, or extra meaty,
          we've got a burger that will blow your mind!
        </p>
      </div>
    </section>

    <section class="about-section" id="about">
      <div class="container">
        <h2 class="section-title">About Us</h2>
        <p class="about-text">
          Tasty Burger started with one simple idea: build a burger so good you
          want to tell everyone about it. Every patty is made fresh, every bun is
          toasted to order, and every sauce is made in our own kitchen.
        </p>
        <ul class="about-points">
          <li><strong>Fresh daily</strong><span>Local ingredients, prepared every morning.</span></li>
          <li><strong>Made to order</strong><span>Your burger is cooked when you order it.</span></li>
          <li><strong>Crazy flavors</strong><span>Bold toppings and sauces you will not find anywhere else.</span></li>
        </ul>
      </div>
    </section>

    <section class="menu-section" id="menu">
      <div class="container">
        <h2 class="section-title">Our Menu</h2>
        <ul class="menu-list" id="menuList"></ul>
      </div>
    </section>

    <section class="shop-section" id="shop">
      <div class="container"><h2 class="section-title">Shop</h2></div>
      <div class="container shop-layout">
        <ul class="thumbs" id="thumbs" aria-label="Choose a burger"></ul>
        <article class="featured" id="featured"></article>
        <aside class="side-list">
          <h3>More Burgers</h3>
          <ul id="sideList"></ul>
          <button class="view-all" data-action="view-all">View All</button>
        </aside>
      </div>
    </section>

    <section class="contact-section" id="contact">
      <div class="container">
        <h2 class="section-title">Contact Us</h2>
        <div class="contact-grid">
          <a class="contact-card" href="tel:${contact.phoneLink}">
            <span class="contact-label">Call us</span>
            <span class="contact-value">${contact.phone}</span>
          </a>
          <a class="contact-card" href="mailto:${contact.email}">
            <span class="contact-label">Email us</span>
            <span class="contact-value">${contact.email}</span>
          </a>
          <a class="contact-card" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}" target="_blank" rel="noopener noreferrer">
            <span class="contact-label">Visit us</span>
            <span class="contact-value">${contact.address}</span>
          </a>
          <div class="contact-card contact-static">
            <span class="contact-label">Open hours</span>
            <span class="contact-value">${contact.hours}</span>
          </div>
        </div>
        <div class="social-links">
          <a href="${contact.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="${contact.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2026 Tasty Burger. Lab 04 — Tasty Burger Layout V2.</p>
    </div>
  </footer>

  <div class="modal" id="modal" hidden>
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <button class="modal-close" data-action="close-modal" aria-label="Close">&times;</button>
      <h2 id="modalTitle"></h2>
      <div id="modalBody"></div>
    </div>
  </div>`;
}
export function thumbTemplate(b) {
    const active = b.id === state.selectedId ? " active" : "";
    return `
    <li>
      <button class="thumb${active}" data-action="select" data-id="${b.id}" aria-label="Show ${b.name}">
        <img src="${b.image}" alt="${b.name}" />
      </button>
    </li>`;
}
export function featuredTemplate(b) {
    const items = b.description.split(",").map((i) => `<li>${i.trim()}</li>`).join("");
    return `
    <h2 class="featured-title">${b.name}</h2>
    <div class="featured-media"><img src="${b.image}" alt="${b.name}" /></div>
    <div class="stars" aria-label="Rating: ${b.rating} out of 5">${renderStars(b.rating)}</div>
    <ul class="ingredients">${items}</ul>
    <span class="price-tag">${money(b.price)}</span>
    <div class="qty" aria-label="Quantity">
      <button data-action="qty-minus" aria-label="Decrease quantity">&minus;</button>
      <span id="qtyValue">${state.qty}</span>
      <button data-action="qty-plus" aria-label="Increase quantity">+</button>
    </div>
    <button class="add-btn" data-action="add">Add to Cart</button>`;
}
export function sideItemTemplate(b) {
    return `
    <li>
      <button class="side-item" data-action="select" data-id="${b.id}">
        <img src="${b.image}" alt="${b.name}" />
        <span class="side-name">${b.name}</span>
        <span class="side-price">${money(b.price)}</span>
      </button>
    </li>`;
}
export function menuItemTemplate(b) {
    return `
    <li>
      <button class="menu-item" data-action="order" data-id="${b.id}" aria-label="Order ${b.name}">
        <img src="${b.image}" alt="${b.name}" loading="lazy" />
        <span class="menu-info">
          <span class="menu-name">${b.name}</span>
          <span class="menu-desc">${b.description}</span>
        </span>
        <span class="price-tag">${money(b.price)}</span>
      </button>
    </li>`;
}
export function cardTemplate(b) {
    return `
    <li class="card" data-action="select" data-id="${b.id}">
      <div class="card-media"><img src="${b.image}" alt="${b.name}" loading="lazy" /></div>
      <div class="card-body">
        <div class="stars">${renderStars(b.rating)}</div>
        <h3 class="card-title">${b.name}</h3>
        <p class="card-desc">${b.description}</p>
        <span class="price-tag">${money(b.price)}</span>
      </div>
    </li>`;
}
function cartRowTemplate(id, q, withRemove) {
    const b = getBurger(id);
    const remove = withRemove
        ? `<button class="remove" data-action="remove" data-id="${id}" aria-label="Remove ${b.name}">&times;</button>`
        : "";
    return `<li class="cart-row"><span>${b.name} &times; ${q}</span><span>${money(b.price * q)}</span>${remove}</li>`;
}
const EMPTY_CART = `<p class="cart-empty">Your cart is empty.</p>`;
export function cartPopupTemplate() {
    if (state.cart.size === 0)
        return EMPTY_CART;
    const rows = Array.from(state.cart).map(([id, q]) => cartRowTemplate(id, q, false)).join("");
    return `
    <ul class="cart-list">${rows}</ul>
    <div class="cart-total"><span>Total</span><strong>${money(cartTotals().total)}</strong></div>
    <button class="view-all" data-action="cart-view-all">View All</button>`;
}
export function cartModalTemplate() {
    if (state.cart.size === 0)
        return EMPTY_CART;
    const rows = Array.from(state.cart).map(([id, q]) => cartRowTemplate(id, q, true)).join("");
    return `
    <ul class="cart-list">${rows}</ul>
    <div class="cart-total"><span>Total</span><strong>${money(cartTotals().total)}</strong></div>`;
}
export function allBurgersTemplate(list) {
    return `<ul class="modal-grid">${list.map(cardTemplate).join("")}</ul>`;
}
//# sourceMappingURL=components.js.map