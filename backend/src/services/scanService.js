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

const createFinding = async (
  scanId,
  instance
) => {
  const result = await pool.query(
    `
    INSERT INTO findings
    (
      scan_id,
      resource_type,
      resource_id,
      state,
      instance_type
    )
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      scanId,
      "EC2",
      instance.instanceId,
      instance.state,
      instance.instanceType,
    ]
  );

  return result.rows[0];
};

module.exports = {
  createScan,
  createFinding,
};