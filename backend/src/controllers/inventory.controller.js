// const { readJSON, writeJSON } = require("../utils/fileHandler");
// const { v4: uuidv4 } = require("uuid");

// const INVENTORY_FILE = "inventory.json";

// exports.getInventory = (req, res) => {
//   const inventory = readJSON(INVENTORY_FILE);
//   res.json(inventory);
// };

// exports.addItem = (req, res) => {
//   const inventory = readJSON(INVENTORY_FILE);

//   const newItem = {
//     id: uuidv4(),
//     name: req.body.name,
//     category: req.body.category || "",
//     currentStock: req.body.currentStock || 0,
//     minStockLevel: req.body.minStockLevel || 5,
//     unitPrice: req.body.unitPrice || 0,
//     createdAt: new Date(),
//   };

//   inventory.push(newItem);
//   writeJSON(INVENTORY_FILE, inventory);

//   res.status(201).json(newItem);
// };
const { readJSON, writeJSON } = require("../utils/fileHandler");
const { v4: uuidv4 } = require("uuid");

const INVENTORY_FILE = "inventory.json";

function getInventory(req, res) {
  const inventory = readJSON(INVENTORY_FILE);
  res.json(inventory);
}

function addItem(req, res) {
  const inventory = readJSON(INVENTORY_FILE);

  const newItem = {
    id: uuidv4(),
    name: req.body.name,
    category: req.body.category || "",
    currentStock: req.body.currentStock || 0,
    minStockLevel: req.body.minStockLevel || 5,
    unitPrice: req.body.unitPrice || 0,
    createdAt: new Date(),
  };

  inventory.push(newItem);
  writeJSON(INVENTORY_FILE, inventory);

  res.status(201).json(newItem);
}

module.exports = {
  getInventory,
  addItem,
};
