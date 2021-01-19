const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorhandler = require("errorhandler");

const PORT = process.env.PORT || 80;

// Setup for mongoose
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

app.use(express.static("public"));

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get the log details of our application if needed
app.use(morgan("dev"));

// api Router
const apiRouter = require("./api/api");
app.use("/api", apiRouter);

app.use(errorhandler());

// Connect to the DB
mongoose.connect(process.env.DB_CONNECTION);

const db = mongoose.connection;

// Catch connection error
db.on("error", console.error.bind(console, "connection error:"));

// Start server once db connection is opened
db.once("open", () => {
  console.log("connected to DB");
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});

module.exports = app;
