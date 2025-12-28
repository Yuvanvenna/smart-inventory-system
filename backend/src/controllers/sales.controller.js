// const { readJSON, writeJSON } = require("../utils/fileHandler");

// const INVENTORY_FILE = "inventory.json";
// const SALES_FILE = "sales.json";

// function addSale(req, res) {
//     const { itemId, quantitySold } = req.body;

//     if (!itemId || !quantitySold) {
//         return res.status(400).json({ message: "itemId and quantitySold are required" });
//     }

//     const inventory = readJSON(INVENTORY_FILE);
//     const sales = readJSON(SALES_FILE);

//     const item = inventory.find((i) => i.id === itemId);

//     if (!item) {
//         return res.status(404).json({ message: "Item not found" });
//     }

//     if (item.currentStock < quantitySold) {
//         return res.status(400).json({ message: "Insufficient stock" });
//     }

//     // Reduce stock
//     item.currentStock -= quantitySold;

//     // Record sale
//     const saleRecord = {
//         itemId,
//         quantitySold,
//         saleDate: new Date(),
//     };

//     sales.push(saleRecord);

//     // Save updates
//     writeJSON(INVENTORY_FILE, inventory);
//     writeJSON(SALES_FILE, sales);

//     res.status(201).json({
//         message: "Sale recorded successfully",
//         sale: saleRecord,
//         updatedStock: item.currentStock,
//     });
// }

// module.exports = {
//     addSale,
// };
const { readJSON, writeJSON } = require("../utils/fileHandler");

const INVENTORY_FILE = "inventory.json";
const SALES_FILE = "sales.json";

// POST /api/sales
function addSale(req, res) {
  const { itemId, quantitySold } = req.body;

  if (!itemId || !quantitySold) {
    return res.status(400).json({
      message: "itemId and quantitySold are required",
    });
  }

  const inventory = readJSON(INVENTORY_FILE);
  const sales = readJSON(SALES_FILE);

  const item = inventory.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (item.currentStock < quantitySold) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  // Reduce stock
  item.currentStock -= quantitySold;

  // Record sale
  const saleRecord = {
    itemId,
    quantitySold,
    saleDate: new Date(),
  };

  sales.push(saleRecord);

  // Persist changes
  writeJSON(INVENTORY_FILE, inventory);
  writeJSON(SALES_FILE, sales);

  res.status(201).json({
    message: "Sale recorded successfully",
    sale: saleRecord,
    updatedStock: item.currentStock,
  });
}

// GET /api/sales
function getSales(req, res) {
  const sales = readJSON(SALES_FILE);
  res.json(sales);
}

module.exports = {
  addSale,
  getSales,
};
