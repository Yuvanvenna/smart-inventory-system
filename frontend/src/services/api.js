// const BASE_URL = "http://localhost:5000";

// export async function fetchDashboardData() {
//   const response = await fetch(`${BASE_URL}/api/dashboard`);
//   return response.json();
// }
// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://smart-inventory-backend-69xx.onrender.com";

export async function fetchDashboardData() {
  const res = await fetch(`${BASE_URL}/api/dashboard`);
  return res.json();
}

export async function addInventoryItem(item) {
  const res = await fetch(`${BASE_URL}/api/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function recordSale(sale) {
  const res = await fetch(`${BASE_URL}/api/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sale),
  });
  return res.json();
}
