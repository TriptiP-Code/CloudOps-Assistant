// const pool = require("../config/db");

// const getIdleResources = async (
//   req,
//   res
// ) => {
//   try {
//     const result =
//       await pool.query(`
//         SELECT
//           resource_id,
//           state,
//           instance_type,
//           monthly_savings,
//           created_at
//         FROM findings
//         WHERE idle = true
//         ORDER BY created_at DESC
//       `);

//     const totalSavings =
//       result.rows.reduce(
//         (sum, row) =>
//           sum +
//           Number(
//             row.monthly_savings
//           ),
//         0
//       );

//     res.json({
//       success: true,
//       count:
//         result.rows.length,
//       totalSavings,
//       resources:
//         result.rows,
//     });

//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message:
//         "Failed to fetch idle resources",
//     });
//   }
// };

// module.exports = {
//   getIdleResources,
// };

const pool = require("../config/db");

const getIdleResources = async (
  req,
  res
) => {
  try {
    const result =
      await pool.query(
        `
        SELECT DISTINCT ON (resource_id)
          resource_id,
          instance_type,
          state,
          monthly_savings,
          created_at
        FROM findings
        WHERE idle=true
        ORDER BY resource_id, created_at DESC
        `
      );

    const totalSavings =
      result.rows.reduce(
        (sum, row) =>
          sum +
          Number(
            row.monthly_savings
          ),
        0
      );

    res.json({
      success: true,
      count:
        result.rows.length,
      totalSavings,
      resources:
        result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message:
        "Failed to load idle resources",
    });
  }
};

module.exports = {
  getIdleResources,
};