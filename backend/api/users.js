const usersRouter = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const users = require("./DB/userDB");

module.exports = usersRouter;

const getUserFromCreds = (id) => {
  const currUser = users.find((user) => user.userId === id);
  if (currUser) {
    return currUser;
  } else {
    throw new Error("Invalid user");
  }
};

// Get all users
usersRouter.get("/", (req, res, next) => {
  res.status(200).send(users);
});

// Add a new user
usersRouter.post("/", (req, res, next) => {
  const userIndex = users.findIndex((user) => req.body.newUser.email === user.email);
  if (userIndex === -1) {
    req.body.newUser.userId = uuidv4();
    users.push(req.body.newUser);
    res.status(201).send(req.body.newUser);
  } else {
    res.status(400).send();
  }
});

// Used for user login
usersRouter.post("/login", (req, res, next) => {
  const userCreds = req.body.userCreds;
  const userIndex = users.findIndex((user) => {
    return (userCreds.email === user.email) & (userCreds.password === user.password);
  });
  const userDataRes = users[userIndex];
  const {
    name,
    email,
    accountCreated,
    userId,
    recentlyViewedWords,
    upvotedWords,
    downvotedWords,
  } = userDataRes;
  if (userIndex !== -1) {
    res.status(200).send({
      name,
      email,
      accountCreated,
      userId,
      recentlyViewedWords,
      upvotedWords,
      downvotedWords,
    });
  } else {
    res.status(404).send();
  }
});

// Set req.currUser param
usersRouter.param("userId", (req, res, next, id) => {
  const currUser = getUserFromCreds(id);
  if (currUser) {
    const {
      name,
      email,
      accountCreated,
      userId,
      recentlyViewedWords,
      upvotedWords,
      downvotedWords,
    } = currUser;
    req.currUser = {
      name,
      email,
      accountCreated,
      userId,
      recentlyViewedWords,
      upvotedWords,
      downvotedWords,
    };
    next();
  } else {
    res.status(404).send();
  }
});

// Get a specific user
usersRouter.get("/:userId", (req, res, next) => {
  if (req.currUser) {
    res.status(200).send(req.currUser);
  } else {
    res.status(400).send();
  }
});

// Post a new wordId to recentlyViewedWords
usersRouter.post("/:userId", (req, res, next) => {
  req.currUser.recentlyViewedWords.unshift(req.body.wordId);
  res.status(201).send(req.currUser.recentlyViewedWords);
});

// Add a word to upvoted / downvoted words
usersRouter.post("/:userId/votes", (req, res, next) => {
  req.currUser.upvotedWords = req.body.upvotedWords;
  req.currUser.downvotedWords = req.body.downvotedWords;
  console.log(req.currUser.upvotedWords, req.currUser.downvotedWords);
  res.status(201).send({
    upvotedWords: req.currUser.upvotedWords,
    downvotedWords: req.currUser.downvotedWords,
  });
});

// Get all votes from specific user
usersRouter.get("/:userId/votes", (req, res, next) => {
  const voteObj = {
    allUpvotedWords: req.currUser.upvotedWords,
    allDownvotedWords: req.currUser.downvotedWords,
  };
  res.send(voteObj);
});
