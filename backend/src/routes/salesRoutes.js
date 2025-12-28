// const express = require("express");
// const router = express.Router();

// const { addSale } = require("../controllers/sales.controller");

// router.post("/", addSale);

// module.exports = router;
const express = require("express");
const router = express.Router();

const { addSale, getSales } = require("../controllers/sales.controller");

router.post("/", addSale);
router.get("/", getSales);

module.exports = router;
