const pool = require("../config/db");

const createScan = async (accountId) => {
  const result = await pool.query(
    `
    INSERT INTO scans(account_id)
    VALUES($1)
    RETURNING *
    `,
    [accountId]
  );

  return result.rows[0];
};

const {
  sendSlackAlert,
} = require("./slackService");

const createFinding = async (
  scanId,
  instance
) => {

  const idle =
    instance.state === "stopped";

  const monthlySavings =
    idle ? 8.00 : 0;

if (idle) {
  await sendSlackAlert(
    `🚨 Idle EC2 Detected

Instance: ${instance.instanceId}
Type: ${instance.instanceType}
State: ${instance.state}

Potential Monthly Savings: $${monthlySavings}`
  );
}

  const result = await pool.query(
    `
    INSERT INTO findings
    (
      scan_id,
      resource_type,
      resource_id,
      state,
      instance_type,
      idle,
      monthly_savings
    )
    VALUES($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `,
    [
      scanId,
      "EC2",
      instance.instanceId,
      instance.state,
      instance.instanceType,
      idle,
      monthlySavings,
    ]
  );

  return result.rows[0];
};

module.exports = {
  createScan,
  createFinding,
};