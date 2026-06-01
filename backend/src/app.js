const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const awsRoutes = require("./routes/awsRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CloudOps Assistant API Running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/aws", awsRoutes);

module.exports = app;