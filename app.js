const express = require("express"),
  logger = require("morgan"),
  cors = require("cors"),
  app = express(),
  connectDB = require("./services/db");

require("dotenv").config();

connectDB();

const authRoutes = require("./routes/auth"),
  jobRoutes = require("./routes/job");

app
  .use(logger("dev"))
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json());

const port = process.env.PORT || 4000;

app.use("/api/v1/auth", authRoutes).use("/api/v1/jobs", jobRoutes);

app.use((err, req, res, next) => {
  const message = err.message,
    status = err.statusCode || 500,
    data = err.data;

  return res.status(status).json({ error: data, message: message });
});

app.listen(port, () => {
  console.log(`${port} is open for requests`);
});
