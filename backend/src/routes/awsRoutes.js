// const router = require("express").Router();

// router.get("/", (req, res) => {
//   res.json({
//     message: "AWS Routes Working",
//   });
// });

// module.exports = router;


const router = require("express").Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  runScan,
} = require("../controllers/scannerController");

const {
  connectAWS,
  getAWSAccounts,
} = require("../controllers/awsController");

const {
  getFindings,
} = require("../controllers/findingsController");

const {
  getScanHistory,
} = require(
  "../controllers/scanHistoryController"
);

const {
  getIdleResources,
} = require(
  "../controllers/idleController"
);

const {
  deleteAllFindings,
  deleteAllScans,
} = require(
  "../controllers/cleanupController"
);

const {
  cleanupScans,
  deleteLatestScan,
} = require(
  "../controllers/cleanupController"
);

router.post(
  "/connect",
  authMiddleware,
  connectAWS
);

router.get(
  "/accounts",
  authMiddleware,
  getAWSAccounts
);

router.get(
  "/scan/:accountId",
  authMiddleware,
  runScan
);

router.get(
  "/findings",
  authMiddleware,
  getFindings
);

router.get(
  "/scans",
  authMiddleware,
  getScanHistory
);

router.get(
  "/idle-resources",
  authMiddleware,
  getIdleResources
);

router.delete(
  "/findings",
  authMiddleware,
  deleteAllFindings
);

router.delete(
  "/scans",
  authMiddleware,
  deleteAllScans
);

router.delete(
  "/scans/cleanup/latest",
  deleteLatestScan
);

router.delete(
  "/scans/cleanup/:period",
  cleanupScans
);

module.exports = router;