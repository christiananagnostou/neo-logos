const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorhandler = require("errorhandler");

const apiRouter = require("./api/api");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get the log details of our application if needed
app.use(morgan("dev"));

// api Router
app.use("/api", apiRouter);

app.use(errorhandler());

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

module.exports = app;
