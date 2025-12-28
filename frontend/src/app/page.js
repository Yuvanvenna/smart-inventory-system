"use client";

import { useEffect, useState } from "react";
import {
  fetchDashboardData,
  addInventoryItem,
  recordSale,
} from "../services/api";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    currentStock: "",
    minStockLevel: "",
    unitPrice: "",
  });

  const [sale, setSale] = useState({
    itemId: "",
    quantitySold: "",
  });

  const loadDashboard = () => {
    fetchDashboardData().then(setItems);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    await addInventoryItem({
      ...newItem,
      currentStock: Number(newItem.currentStock),
      minStockLevel: Number(newItem.minStockLevel),
      unitPrice: Number(newItem.unitPrice),
    });
    setNewItem({
      name: "",
      category: "",
      currentStock: "",
      minStockLevel: "",
      unitPrice: "",
    });
    loadDashboard();
  };

  const handleSale = async (e) => {
    e.preventDefault();
    await recordSale({
      itemId: sale.itemId,
      quantitySold: Number(sale.quantitySold),
    });
    setSale({ itemId: "", quantitySold: "" });
    loadDashboard();
  };

  return (
    <main className="container">
      <h1>Smart Inventory Dashboard</h1>

      {/* Add Inventory */}
      <div className="card">
        <h2>Add Inventory Item</h2>
        <form onSubmit={handleAddItem}>
          <input
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          <input
            placeholder="Category"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Stock"
            value={newItem.currentStock}
            onChange={(e) =>
              setNewItem({ ...newItem, currentStock: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Min Stock"
            value={newItem.minStockLevel}
            onChange={(e) =>
              setNewItem({ ...newItem, minStockLevel: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={newItem.unitPrice}
            onChange={(e) =>
              setNewItem({ ...newItem, unitPrice: e.target.value })
            }
          />
          <button type="submit">Add Item</button>
        </form>
      </div>

      {/* Record Sale */}
      <div className="card">
        <h2>Record Sale</h2>
        <form onSubmit={handleSale}>
          <select
            value={sale.itemId}
            onChange={(e) => setSale({ ...sale, itemId: e.target.value })}
            required
          >
            <option value="">Select Item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity Sold"
            value={sale.quantitySold}
            onChange={(e) => setSale({ ...sale, quantitySold: e.target.value })}
            required
          />
          <button type="submit">Record Sale</button>
        </form>
      </div>

      {/* Inventory Table */}
      <div className="card">
        <h2>Inventory Overview</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Stock</th>
              <th>Sold (30 days)</th>
              <th>Velocity</th>
              <th>Movement</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.currentStock}</td>
                <td>{item.unitsSoldLast30Days}</td>
                <td>{item.salesVelocity}</td>
                <td
                  className={
                    item.movementType === "Fast-moving" ? "fast" : "slow"
                  }
                >
                  {item.movementType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
