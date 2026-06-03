// const pool = require("../config/db");

// const connectAWS = async (req, res) => {
//   try {
//     const {
//       accountName,
//       accessKey,
//       secretKey,
//       region,
//     } = req.body;

//     const userId = req.user.userId;

//     const result = await pool.query(
//       `
//       INSERT INTO aws_accounts
//       (
//         user_id,
//         account_name,
//         access_key,
//         secret_key,
//         region
//       )
//       VALUES ($1,$2,$3,$4,$5)
//       RETURNING *
//       `,
//       [
//         userId,
//         accountName,
//         accessKey,
//         secretKey,
//         region,
//       ]
//     );

//     res.status(201).json({
//       message: "AWS Account Connected",
//       account: result.rows[0],
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };

// const getAWSAccounts = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     const result = await pool.query(
//       `
//       SELECT *
//       FROM aws_accounts
//       WHERE user_id=$1
//       ORDER BY created_at DESC
//       `,
//       [userId]
//     );

//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };

// module.exports = {
//   connectAWS,
//   getAWSAccounts,
// };



const pool = require("../config/db");

const {
  validateAWSCredentials,
} = require("../services/awsValidationService");

const connectAWS = async (req, res) => {
  try {
    const {
      accountName,
      accessKey,
      secretKey,
      region,
    } = req.body;

    const userId = req.user.userId;

    /*
      Validate Credentials First
    */

    const validation =
      await validateAWSCredentials(
        accessKey,
        secretKey,
        region
      );

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid AWS Credentials",
        error: validation.error,
      });
    }

    /*
      Save Account
    */

    const result = await pool.query(
      `
      INSERT INTO aws_accounts
      (
        user_id,
        account_name,
        access_key,
        secret_key,
        region
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        userId,
        accountName,
        accessKey,
        secretKey,
        region,
      ]
    );

    res.status(201).json({
      success: true,
      message:
        "AWS Account Connected Successfully",

      awsIdentity: {
        accountId:
          validation.accountId,
        arn: validation.arn,
        userId:
          validation.userId,
      },

      account: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getAWSAccounts = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT *
      FROM aws_accounts
      WHERE user_id=$1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  connectAWS,
  getAWSAccounts,
};