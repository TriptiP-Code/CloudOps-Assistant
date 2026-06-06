// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");


// const authRoutes = require("./routes/authRoutes");
// const awsRoutes = require("./routes/awsRoutes");

// const app = express();

// app.use(cors());
// app.use(helmet());
// app.use(express.json());


// app.get("/", (req, res) => {
//   res.json({
//     message: "CloudOps Assistant API Running",
//   });
// });

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/aws", awsRoutes);

// module.exports = app;


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const awsRoutes = require("./routes/awsRoutes");
const scannerRoutes = require("./routes/scannerRoutes");
const dashboardRoutes =
  require("./routes/dashboardRoutes");
const slackRoutes =
  require("./routes/slackRoutes");

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors());

// Parse JSON Body
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api/v1/scanner",
  scannerRoutes
);

app.use(
  "/api/v1/dashboard",
  dashboardRoutes
);

// Debug Middleware
app.use((req, res, next) => {
  console.log("================================");
  console.log("METHOD:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY:", req.body);
  console.log("================================");
  next();
});

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CloudOps Assistant API Running",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/aws", awsRoutes);
app.use(
  "/api/v1/slack",
  slackRoutes
);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;