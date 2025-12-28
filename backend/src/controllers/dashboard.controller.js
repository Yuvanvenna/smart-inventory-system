const { analyzeInventoryMovement } = require("../services/movement.service");

function getDashboard(req, res) {
  const dashboardData = analyzeInventoryMovement();
  res.json(dashboardData);
}

module.exports = {
  getDashboard,
};
