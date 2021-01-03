const express = require("express");
const app = express();

module.exports = app;

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

// Add middleware for handling CORS requests from index.html
const cors = require("cors");
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get the log details of our application if needed
const logger = require("morgan");
app.use(logger("dev"));

const wordsRouter = require("./api/words");
app.use("/api/words", wordsRouter);
const usersRouter = require("./api/users");
app.use("/api/users", usersRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
