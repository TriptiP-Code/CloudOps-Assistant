const router = require("express").Router();

const {
  sendSlackAlert,
} = require("../services/slackService");

router.get(
  "/test",
  async (req, res) => {
    await sendSlackAlert(
      "🚨 CloudOps Test Alert"
    );

    res.json({
      success: true,
      message: "Slack Alert Sent",
    });
  }
);

module.exports = router;