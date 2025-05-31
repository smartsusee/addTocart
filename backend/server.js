const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./router/router");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api", router);
mongoose
  .connect(`${process.env.DB}/regiterData`)
  .then(() => {
    console.log("db is connected");
  })
  .catch(() => {
    console.log("db is not connected");
  });

app.listen(process.env.PORT, () => {
  console.log("server is running on port 3000");
});
