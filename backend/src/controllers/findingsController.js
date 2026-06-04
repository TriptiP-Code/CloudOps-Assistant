const pool = require("../config/db");

const getFindings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        f.*,
        s.scan_date,
        a.account_name
      FROM findings f
      JOIN scans s
        ON f.scan_id = s.id
      JOIN aws_accounts a
        ON s.account_id = a.id
      WHERE a.user_id = $1
      ORDER BY f.created_at DESC
      `,
      [userId]
    );

    res.json({
      success: true,
      count: result.rows.length,
      findings: result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch findings",
    });
  }
};

module.exports = {
  getFindings,
};