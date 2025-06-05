import { EVER_SHOP_API_BASE } from "./config.js";

async function fetchProducts(page = 1, limit = 12) {
  try {
    const resp = await fetch(
      `${EVER_SHOP_API_BASE}/api/catalog/listProduct?page=${page}&limit=${limit}`
    );
    if (!resp.ok) {
      console.error("Error fetching products:", resp.status);
      return [];
    }
    const data = await resp.json();
    return data.products; // or however EverShop shapes its JSON (could be { data: [...], meta: {...} })
  } catch (err) {
    console.error("Network error:", err);
    return [];
  }
}

function renderProductCard(product) {
  // Create a simple card element for each product
  const card = document.createElement("div");
  card.classList.add("product-card");

  const img = document.createElement("img");
  img.src = product.images?.[0] || "/placeholder.png";
  img.alt = product.name;
  card.appendChild(img);

  const name = document.createElement("h3");
  name.textContent = product.name;
  card.appendChild(name);

  const price = document.createElement("p");
  price.textContent = `$${product.price.toFixed(2)}`;
  card.appendChild(price);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to Cart";
  addToCartBtn.onclick = () => addToCart(product.id, 1);
  card.appendChild(addToCartBtn);

  return card;
}

async function loadAndDisplayProducts() {
  const products = await fetchProducts();
  const container = document.getElementById("product-list");
  container.innerHTML = ""; // clear any “Loading...” text

  if (products.length === 0) {
    container.textContent = "No products found.";
    return;
  }

  products.forEach((prod) => {
    const card = renderProductCard(prod);
    container.appendChild(card);
  });
}

async function addToCart(productId, quantity) {
  try {
    const resp = await fetch(
      `${EVER_SHOP_API_BASE}/api/cart/addCartItem`,
      {
        method: "POST",
        credentials: "include", // if EverShop uses cookies; if JWT, skip this
        headers: {
          "Content-Type": "application/json",
          // If using JWT authentication: 
          // "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ productId, quantity }),
      }
    );
    if (!resp.ok) {
      const errorData = await resp.json();
      alert("Error adding to cart: " + (errorData.message || resp.status));
      return;
    }
    alert("Added to cart!");
    // Optionally, refresh a cart icon badge, etc.
  } catch (err) {
    console.error("Network error:", err);
  }
}

// On page load, fetch & render
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-list");
  container.textContent = "Loading products...";
  loadAndDisplayProducts();
});

