interface Burger {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number; // 0–5, supports halves
  image: string;
}

const burgers: Burger[] = [
  {
    id: "ultimate-bacon",
    name: "Ultimate Bacon",
    description: "House patty, cheddar cheese, bacon, onion, mustard",
    price: 99.32,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "black-sheep",
    name: "Black Sheep",
    description: "American cheese, tomato relish, avocado, lettuce, red onion",
    price: 69.15,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "vegan-burger",
    name: "Vegan Burger",
    description: "House patty, cheddar cheese, bacon, onion, mustard",
    price: 99.25,
    rating: 3.5,
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    description: "Chicken breast, chilli sauce, tomatoes, pickles, coleslaw",
    price: 99.15,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "double-stack",
    name: "Double Stack",
    description: "Double patty, smoked cheddar, crispy onions, BBQ sauce",
    price: 112.4,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=500&q=80",
  },
];

const CURRENCY = "\u09F3"; // ৳

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  const empty = 5 - full - (half ? 1 : 0);

  let html = "";
  for (let i = 0; i < full; i++) html += "\u2605"; // ★
  if (half) html += "\u2BE8"; // half star glyph fallback
  for (let i = 0; i < empty; i++) html += "<span class=\"empty\">\u2605</span>";
  return html;
}

function cardTemplate(burger: Burger): string {
  return `
    <li class="card" data-id="${burger.id}">
      <div class="card-media">
        <img src="${burger.image}" alt="${burger.name}" loading="lazy" />
        <button class="fav-btn" aria-label="Save ${burger.name} to favorites" aria-pressed="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 21s-7.5-4.6-10-9.3C.5 8.3 2.4 5 6 5c2 0 3.5 1 6 3.3C14.5 6 16 5 18 5c3.6 0 5.5 3.3 4 6.7C19.5 16.4 12 21 12 21Z"/>
          </svg>
        </button>
      </div>
      <div class="card-body">
        <div class="stars" aria-label="Rating: ${burger.rating} out of 5">${renderStars(burger.rating)}</div>
        <h3 class="card-title">${burger.name}</h3>
        <p class="card-desc">${burger.description}</p>
        <span class="price-tag">${CURRENCY}${burger.price.toFixed(2)}</span>
      </div>
    </li>
  `;
}

function init(): void {
  const carousel = document.getElementById("carousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cartButton = document.getElementById("cartButton");
  const cartCountEl = document.getElementById("cartCount");

  if (!carousel || !prevBtn || !nextBtn || !cartButton || !cartCountEl) return;

  carousel.innerHTML = burgers.map(cardTemplate).join("");

  let cartCount = 0;
  const updateCartBadge = () => {
    cartCountEl.textContent = String(cartCount);
  };

  // Favorite toggle — clicking the heart "adds" the burger to the cart.
  carousel.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const favBtn = target.closest<HTMLButtonElement>(".fav-btn");
    if (!favBtn) return;

    const isActive = favBtn.classList.toggle("active");
    favBtn.setAttribute("aria-pressed", String(isActive));
    cartCount += isActive ? 1 : -1;
    updateCartBadge();
  });

  const scrollByCard = (direction: 1 | -1) => {
    const card = carousel.querySelector<HTMLElement>(".card");
    const step = card ? card.offsetWidth + 22 : 280;
    carousel.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  prevBtn.addEventListener("click", () => scrollByCard(-1));
  nextBtn.addEventListener("click", () => scrollByCard(1));

  cartButton.addEventListener("click", () => {
    cartButton.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.15)" }, { transform: "scale(1)" }],
      { duration: 220, easing: "ease-out" }
    );
  });

  updateCartBadge();
}

document.addEventListener("DOMContentLoaded", init);