import { EVER_SHOP_API_BASE } from "./config";

function getDefaultHeaders() {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("everShopToken");
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function apiGet(path) {
  const res = await fetch(`${EVER_SHOP_API_BASE}${path}`, {
    method: "GET",
    credentials: "include",
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiPost(path, bodyObj) {
  const res = await fetch(`${EVER_SHOP_API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: getDefaultHeaders(),
    body: JSON.stringify(bodyObj),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiPut(path, bodyObj) {
  const res = await fetch(`${EVER_SHOP_API_BASE}${path}`, {
    method: "PUT",
    credentials: "include",
    headers: getDefaultHeaders(),
    body: JSON.stringify(bodyObj),
  });
  if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiDelete(path) {
  const res = await fetch(`${EVER_SHOP_API_BASE}${path}`, {
    method: "DELETE",
    credentials: "include",
    headers: getDefaultHeaders(),
  });
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
  return res.json();
}
