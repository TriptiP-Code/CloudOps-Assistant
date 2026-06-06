// const pool = require("../config/db");

// const getDashboardStats = async (
//   req,
//   res
// ) => {
//   try {

//     const accountsResult =
//       await pool.query(`
//         SELECT COUNT(*) as count
//         FROM aws_accounts
//       `);

//     const findingsResult =
//       await pool.query(`
//         SELECT COUNT(*) as count
//         FROM findings
//       `);

//     const scansResult =
//       await pool.query(`
//         SELECT COUNT(*) as count
//         FROM scans
//       `);

//     const savingsResult =
//       await pool.query(`
//         SELECT COALESCE(
//           SUM(monthly_savings),
//           0
//         ) as total
//         FROM (
//           SELECT DISTINCT ON(resource_id)
//             resource_id,
//             monthly_savings
//           FROM findings
//           WHERE idle = true
//           ORDER BY resource_id, created_at DESC
//         ) t
//       `);

//     res.json({
//       success: true,

//       awsAccounts:
//         Number(
//           accountsResult.rows[0].count
//         ),

//       findings:
//         Number(
//           findingsResult.rows[0].count
//         ),

//       scans:
//         Number(
//           scansResult.rows[0].count
//         ),

//       savings:
//         Number(
//           savingsResult.rows[0].total
//         ),
//     });

//   } catch (err) {

//     console.error(err);

//     res.status(500).json({
//       message:
//         "Failed to load dashboard stats",
//     });

//   }
// };

// module.exports = {
//   getDashboardStats,
// };


const pool = require("../config/db");

const getDashboardStats = async (
  req,
  res
) => {
  try {

    const userId =
      req.user.userId;

    /*
      AWS Accounts
    */

    const accountsResult =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM aws_accounts
        WHERE user_id=$1
        `,
        [userId]
      );

    /*
      Findings
    */

    const findingsResult =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM findings f
        JOIN scans s
          ON f.scan_id = s.id
        JOIN aws_accounts a
          ON s.account_id = a.id
        WHERE a.user_id=$1
        `,
        [userId]
      );

    /*
      Scans
    */

    const scansResult =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM scans s
        JOIN aws_accounts a
          ON s.account_id = a.id
        WHERE a.user_id=$1
        `,
        [userId]
      );

    /*
      Savings
    */

    const savingsResult =
      await pool.query(
        `
        SELECT
        COALESCE(
          SUM(monthly_savings),
          0
        ) AS total
             FROM
    (
      SELECT DISTINCT ON (f.resource_id)
        f.resource_id,
        f.monthly_savings
      FROM findings f
      JOIN scans s
        ON f.scan_id=s.id
      JOIN aws_accounts a
        ON s.account_id=a.id
      WHERE a.user_id=$1
      ORDER BY
        f.resource_id,
        f.created_at DESC
    ) latest_findings
        `,
        [userId]
      );

    res.json({
      success: true,

      awsAccounts:
        Number(
          accountsResult.rows[0].count
        ),

      findings:
        Number(
          findingsResult.rows[0].count
        ),

      scans:
        Number(
          scansResult.rows[0].count
        ),

      savings:
        Number(
          savingsResult.rows[0].total
        ),
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message:
        "Failed to load dashboard stats",
    });
  }
};

const getFindingsTrend = async (
  req,
  res
) => {
  try {

    const result = await pool.query(
      `
      SELECT
        DATE(created_at) as day,
        COUNT(*) as findings
      FROM findings
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
      `
    );

    res.json({
      success: true,
      trend: result.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message:
        "Failed to load trend data",
    });
  }
};



module.exports = {
  getDashboardStats,
  getFindingsTrend,
};