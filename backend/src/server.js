// require("dotenv").config();

// const app = require("./app");

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const pool = require("./config/db");

// pool.query("SELECT NOW()")
//   .then((res) => {
//     console.log("DB Connected");
//     console.log(res.rows[0]);
//   })
//   .catch((err) => {
//     console.error("DB Error:", err);
//   });

//   pool.query(`
// SELECT table_name
// FROM information_schema.tables
// WHERE table_schema='public'
// `)
// .then((res) => {
//   console.log("TABLES:");
//   console.log(res.rows);
// });

require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("================================");
    console.log("Database Connected");
    console.log(result.rows[0]);
    console.log("================================");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

startServer();