// productService.js
import { EVER_SHOP_API_BASE } from "./config";

export async function fetchAllProducts(page = 1, limit = 20) {
  const url = `${EVER_SHOP_API_BASE}/api/catalog/listProduct?page=${page}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json(); // returns an array of product objects
}
