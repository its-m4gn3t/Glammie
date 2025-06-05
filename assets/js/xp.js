import { apiGet, apiPost, apiPut, apiDelete } from "./apiClient.js";

async function loadProducts() {
  const data = await apiGet("/api/catalog/listProduct?page=1&limit=20");
  return data.products;
}

async function login(email, password) {
  const data = await apiPost("/api/user/login", { email, password });
  localStorage.setItem("everShopToken", data.token);
}
