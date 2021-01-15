const express = require("express");
const apiRouter = express.Router();

// Api Routers
const wordsRouter = require("./wordsRouter");
const usersRouter = require("./usersRouter");

apiRouter.use("/words", wordsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
