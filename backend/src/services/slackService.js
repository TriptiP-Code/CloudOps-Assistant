const axios = require("axios");

const sendSlackAlert = async (
  message
) => {
  try {
    await axios.post(
      process.env.SLACK_WEBHOOK_URL,
      {
        text: message,
      }
    );
  } catch (error) {
    console.error(
      "Slack Error:",
      error.message
    );
  }
};

module.exports = {
  sendSlackAlert,
};