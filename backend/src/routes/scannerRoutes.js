const router =
  require("express").Router();

const {
  runScan,
} = require(
  "../controllers/scannerController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

router.post(
  "/:accountId",
  authMiddleware,
  runScan
);

module.exports = router;