
// const express = require("express");

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.json([]);
// });

// module.exports = router;
const express = require("express");
const router = express.Router();

const {
  getInventory,
  addItem,
} = require("../controllers/inventory.controller");

router.get("/", getInventory);
router.post("/", addItem);

module.exports = router;
