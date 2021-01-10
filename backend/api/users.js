const usersRouter = require("express").Router();

const users = require("./DB/userDB");

module.exports = usersRouter;

const getUserFromId = (id) => {
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
    req.body.newUser.userId = users.length;
    users.push(req.body.newUser);
    const userData = { ...users[users.length - 1] };
    delete userData.password;
    res.status(201).send({ ...userData });
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
  if (userIndex !== -1) {
    const userData = { ...users[userIndex] };
    delete userData.password;
    res.status(200).send({ ...userData });
  } else {
    res.status(404).send();
  }
});

// Set req.currUser param
usersRouter.param("userId", (req, res, next, id) => {
  const currUser = getUserFromId(Number(id));
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

// Post a new word to recentlyViewedWords
usersRouter.post("/:userId/viewed-word", (req, res, next) => {
  const userViewedWords = req.currUser.recentlyViewedWords;
  const viewedWordIndex = userViewedWords.findIndex((word) => word.wordId === req.body.word.wordId);
  if (viewedWordIndex !== -1) userViewedWords.splice(viewedWordIndex, 1);
  userViewedWords.unshift(req.body.word);
  res.status(201).send(userViewedWords);
});

// Middleware for checking if a vote has already been voted on
const checkUpvotedWord = (req, res, next) => {
  const id = req.body.word_id;

  const allUpvotedWords = req.currUser.upvotedWords;
  const upvoteIndex = allUpvotedWords.indexOf(id);

  if (upvoteIndex !== -1) {
    allUpvotedWords.splice(upvoteIndex, 1);
    res.status(201).send(allUpvotedWords);
  } else {
    next();
  }
};
const checkDownvotedWord = (req, res, next) => {
  const id = req.body.word_id;

  const allDownvotedWords = req.currUser.downvotedWords;
  const downvoteIndex = allDownvotedWords.indexOf(id);

  if (downvoteIndex !== -1) {
    allDownvotedWords.splice(downvoteIndex, 1);
    res.status(201).send(allDownvotedWords);
  } else {
    next();
  }
};

// Add a word to upvoted words
usersRouter.post("/:userId/upvoted", checkUpvotedWord, (req, res, next) => {
  const allUpvotedWords = req.currUser.upvotedWords;
  allUpvotedWords.push(req.body.word_id);
  res.status(201).send(allUpvotedWords);
});

// Add a word to downvoted words
usersRouter.post("/:userId/downvoted", checkDownvotedWord, (req, res, next) => {
  const allDownvotedWords = req.currUser.downvotedWords;
  allDownvotedWords.push(req.body.word_id);
  res.status(201).send(allDownvotedWords);
});

// Get all votes from specific user
usersRouter.get("/:userId/votes", (req, res, next) => {
  const voteObj = {
    allUpvotedWords: req.currUser.upvotedWords,
    allDownvotedWords: req.currUser.downvotedWords,
  };
  res.send(voteObj);
});
