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

module.exports = router;