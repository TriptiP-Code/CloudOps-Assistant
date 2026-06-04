const pool = require("../config/db");

const getScanHistory = async (
  req,
  res
) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.scan_date,
        a.account_name,
        COUNT(f.id) AS findings_count
      FROM scans s

      JOIN aws_accounts a
        ON s.account_id = a.id

      LEFT JOIN findings f
        ON f.scan_id = s.id

      WHERE a.user_id = $1

      GROUP BY
        s.id,
        a.account_name

      ORDER BY
        s.scan_date DESC
      `,
      [userId]
    );

    res.json({
      success: true,
      count: result.rows.length,
      scans: result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch scan history",
    });
  }
};

module.exports = {
  getScanHistory,
};