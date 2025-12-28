const { readJSON } = require("../utils/fileHandler");

const INVENTORY_FILE = "inventory.json";
const SALES_FILE = "sales.json";

const DAYS_WINDOW = 30;
const FAST_MOVING_THRESHOLD = 0.5; // units per day

function analyzeInventoryMovement() {
  const inventory = readJSON(INVENTORY_FILE);
  const sales = readJSON(SALES_FILE);

  const now = new Date();
  const windowStart = new Date();
  windowStart.setDate(now.getDate() - DAYS_WINDOW);

  return inventory.map((item) => {
    const itemSales = sales.filter(
      (s) => s.itemId === item.id && new Date(s.saleDate) >= windowStart
    );

    const unitsSold = itemSales.reduce((sum, s) => sum + s.quantitySold, 0);

    const salesVelocity = unitsSold / DAYS_WINDOW;

    const movementType =
      salesVelocity >= FAST_MOVING_THRESHOLD ? "Fast-moving" : "Slow-moving";

    const lowStock = item.currentStock <= item.minStockLevel;

    return {
      id: item.id,
      name: item.name,
      category: item.category,
      currentStock: item.currentStock,
      minStockLevel: item.minStockLevel,
      unitsSoldLast30Days: unitsSold,
      salesVelocity: Number(salesVelocity.toFixed(2)),
      movementType,
      lowStock,
    };
  });
}

module.exports = {
  analyzeInventoryMovement,
};
