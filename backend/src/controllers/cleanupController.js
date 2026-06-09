const pool = require("../config/db");

/*
=================================
DELETE ALL FINDINGS
=================================
*/

const deleteAllFindings = async (
  req,
  res
) => {
  try {
    await pool.query(`
      DELETE FROM findings
    `);

    res.json({
      success: true,
      message: "All findings deleted",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

/*
=================================
DELETE ALL SCANS
=================================
*/

const deleteAllScans = async (
  req,
  res
) => {
  try {

    const findings =
      await pool.query(`
        SELECT COUNT(*) AS total
        FROM findings
      `);

    const totalFindings =
      Number(
        findings.rows[0].total
      );

    if (totalFindings > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Delete findings first before deleting scans.",
      });
    }

    await pool.query(`
      DELETE FROM scans
    `);

    res.json({
      success: true,
      message: "All scans deleted",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

/*
=================================
DELETE LATEST SCAN
=================================
*/

const deleteLatestScan =
  async (req, res) => {
    try {

      const findings =
        await pool.query(`
          SELECT COUNT(*) AS total
          FROM findings
        `);

      const totalFindings =
        Number(
          findings.rows[0].total
        );

      if (totalFindings > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Delete findings first before deleting scans.",
        });
      }

      const latest =
        await pool.query(`
          SELECT id
          FROM scans
          ORDER BY scan_date DESC
          LIMIT 1
        `);

      if (
        latest.rows.length === 0
      ) {
        return res.json({
          success: true,
          message:
            "No scans found",
        });
      }

      const scanId =
        latest.rows[0].id;

      await pool.query(
        `
        DELETE FROM scans
        WHERE id=$1
        `,
        [scanId]
      );

      res.json({
        success: true,
        message:
          "Latest scan deleted",
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message:
          "Delete failed",
      });
    }
  };

/*
=================================
TIME BASED CLEANUP
=================================
*/

const cleanupScans = async (
  req,
  res
) => {
  try {

    const findings =
      await pool.query(`
        SELECT COUNT(*) AS total
        FROM findings
      `);

    const totalFindings =
      Number(
        findings.rows[0].total
      );

    if (totalFindings > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Delete findings first before deleting scans.",
      });
    }

    const { period } =
      req.params;

    let interval;

    switch (period) {
      case "1hour":
        interval = "1 hour";
        break;

      case "5hours":
        interval = "5 hours";
        break;

      case "24hours":
        interval = "24 hours";
        break;

      case "7days":
        interval = "7 days";
        break;

      case "30days":
        interval = "30 days";
        break;

      default:
        return res.status(400).json({
          success: false,
          message:
            "Invalid period",
        });
    }

    const result =
      await pool.query(
        `
        DELETE FROM scans
        WHERE scan_date >=
        NOW() - INTERVAL '${interval}'
      `
      );

    res.json({
      success: true,
      message:
        "Cleanup completed",
      deleted:
        result.rowCount,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        "Cleanup failed",
    });
  }
};

module.exports = {
  deleteAllFindings,
  deleteAllScans,
  cleanupScans,
  deleteLatestScan,
};