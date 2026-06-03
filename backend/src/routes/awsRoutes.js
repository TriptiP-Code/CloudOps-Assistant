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

module.exports = router;