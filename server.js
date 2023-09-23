const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require('path');
const connectDatabase = require("./config/database");

// connecting to database
connectDatabase();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, "./client/build")));

// import routes
const Routes = require("./routes/Route");
app.use("/", Routes);
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})