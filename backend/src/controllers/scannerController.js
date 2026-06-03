const pool = require("../config/db");

const {
  scanEC2Instances,
} = require("../services/ec2ScannerService");

const {
  createScan,
  createFinding,
} = require("../services/scanService");

const runScan = async (
  req,
  res
) => {
  try {
    const accountId =
      req.params.accountId;

    const accountResult =
      await pool.query(
        `
        SELECT *
        FROM aws_accounts
        WHERE id=$1
        `,
        [accountId]
      );

    if (
      accountResult.rows.length === 0
    ) {
      return res.status(404).json({
        message:
          "AWS Account Not Found",
      });
    }

    const account =
      accountResult.rows[0];

    const instances =
      await scanEC2Instances(
        account.access_key,
        account.secret_key,
        account.region
      );

    /*
      Create Scan Record
    */

    const scan =
      await createScan(
        account.id
      );

    /*
      Save Findings
    */

    for (const instance of instances) {
      await createFinding(
        scan.id,
        instance
      );
    }

    res.json({
      success: true,
      scanId: scan.id,
      totalInstances:
        instances.length,
      instances,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Scan Failed",
    });
  }
};

module.exports = {
  runScan,
};