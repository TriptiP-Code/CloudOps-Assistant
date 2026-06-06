const router = require("express").Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);


const {
  getDashboardStats,
  getFindingsTrend,
} = require(
  "../controllers/dashboardController"
);

router.get(
  "/stats",
  authMiddleware,
  getDashboardStats
);

router.get(
  "/trend",
  authMiddleware,
  getFindingsTrend
);



module.exports = router;