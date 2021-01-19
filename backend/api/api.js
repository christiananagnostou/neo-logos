const express = require("express");
const apiRouter = express.Router();

// // Api Routers
const wordsRoute = require("./wordsRoute");
const usersRoute = require("./usersRoute");

apiRouter.use("/words", wordsRoute);
apiRouter.use("/users", usersRoute);

module.exports = apiRouter;
