const pool = require("../config/db");

const connectAWS = async (req, res) => {
  try {
    const {
      accountName,
      accessKey,
      secretKey,
      region,
    } = req.body;

    const userId = req.user.userId;

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
      message: "AWS Account Connected",
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