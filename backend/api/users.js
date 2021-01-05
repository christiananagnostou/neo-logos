const usersRouter = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const users = require("./DB/userDB");

module.exports = usersRouter;

const getUserFromCreds = (id) => {
  const currUser = users.find((user) => user.userId === id);
  return currUser;
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

//
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
  const userIndex = users.findIndex((user) => {
    return user.userId === req.params.userId;
  });
  if (userIndex !== -1) {
    users[userIndex].recentlyViewedWords.unshift(req.body.wordId);
    res.status(201).send(users[userIndex].recentlyViewedWords);
  } else {
    res.status(400).send();
  }
});

// Add a word to upvoted / downvoted words
usersRouter.post("/:userId/votes", (req, res, next) => {
  const userIndex = users.findIndex((user) => {
    return user.userId === req.params.userId;
  });
  if (userIndex !== -1) {
    users[userIndex].upvotedWords = req.body.upvotedWords;
    users[userIndex].downvotedWords = req.body.downvotedWords;
    res.status(201).send({
      upvotedWords: users[userIndex].upvotedWords,
      downvotedWords: users[userIndex].downvotedWords,
    });
  } else {
    res.status(400).send();
  }
});

// Get all votes from specific user
usersRouter.get("/:userId/votes", (req, res, next) => {
  const userIndex = users.findIndex((user) => {
    return user.userId === req.params.userId;
  });
  if (userIndex !== -1) {
    const voteObj = {
      allUpvotedWords: users[userIndex].upvotedWords,
      allDownvotedWords: users[userIndex].downvotedWords,
    };
    res.send(voteObj);
  } else {
    res.status(400).send();
  }
});
