const usersRoute = require("express").Router();
const User = require("../models/Users");

module.exports = usersRoute;

const getUserFromId = async (id) => {
  const userResult = User.findOne({ _id: id });
  try {
    const user = await userResult;
    return user;
  } catch (e) {
    next(err);
  }
};

// // Set req.currUser param
// usersRoute.param("userId", (req, res, next, userId) => {
//   const sql = `SELECT * FROM Users WHERE id = $id`;
//   const values =` { $id: userId };

//   db.get(sql, values, (err, user) => {
//     if (err) {
//       next(err);
//     } else if (user) {
//       const userData = configureUserData(user);
//       req.currUser = { ...userData };
//       next();
//     } else {
//       res.sendStatus(404);
//     }
//   });
// });

const checkIfAccountExists = async (req, res, next) => {
  const { name, email } = req.body.newUser;
  // Check if email or name is already registered
  const emailSearch = User.findOne({ email: email });
  const nameSearch = User.findOne({ name: name });
  try {
    const emailResult = await emailSearch;
    const nameResult = await nameSearch;
    if (emailResult) {
      // Email already in database
      res.sendStatus(451);
    } else if (nameResult) {
      // Name already in database
      res.sendStatus(452);
    } else {
      // Valid new account
      next();
    }
  } catch (e) {
    next(e);
  }
};

// Add a new user
usersRoute.post("/", checkIfAccountExists, async (req, res, next) => {
  const { name, email, password } = req.body.newUser;

  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
});

// Used for user login
usersRoute.post("/login", async (req, res, next) => {
  const { email, password } = req.body.userCreds;
  const userResult = User.findOne({ email: email, password: password });

  try {
    const userData = await userResult;
    if (userData) {
      delete userData.password;
      res.status(200).json(userData);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    next(e);
  }
});

// Post a new word to recentlyViewedWords
usersRoute.post("/:userId/viewed-word", async (req, res, next) => {
  const userId = req.params.userId;
  const newWord = req.body.word;
  const { viewHistory } = await getUserFromId(userId);
  // Mongoose params
  const query = { _id: userId };
  let newViewHistory = [];
  const options = { new: true };

  // Check if the word is already in the viewHistory
  const allIds = viewHistory.map((word) => word._id);
  if (allIds.includes(newWord._id)) {
    // If so, filter it out
    const filteredWords = viewHistory.filter((word) => word._id !== newWord._id);
    newViewHistory = [newWord, ...filteredWords];
  } else if (viewHistory.length < 5) {
    // If there are less than 5 words, add new one
    newViewHistory = [newWord, ...viewHistory];
  } else {
    // Add new one and cut off last one
    newViewHistory = [newWord, ...viewHistory.slice(0, -1)];
  }
  // Update document
  const updateViewHistory = User.updateOne(query, { viewHistory: newViewHistory }, options);

  try {
    await updateViewHistory;
    res.status(201).send(newViewHistory);
  } catch (e) {
    next(e);
  }
});

// Add / remove a word to upvoted words
usersRoute.post("/:userId/upvoted", async (req, res, next) => {
  const userId = req.params.userId;
  const wordId = req.body.wordId;
  const { upvotedWords } = await getUserFromId(userId);
  // Mongoose params
  const query = { _id: userId };
  let updatedArr = [];
  const options = { new: true };

  // Check if the wordId already exists in the upvotedWords array
  if (upvotedWords.includes(wordId)) {
    // If so, remove it and update
    updatedArr = upvotedWords.filter((id) => id !== wordId);
  } else {
    // If not, add it and update
    updatedArr = [...upvotedWords, wordId];
  }
  // Update document
  const updateUpvotedWords = User.findOneAndUpdate(query, { upvotedWords: updatedArr }, options);

  try {
    const user = await updateUpvotedWords;
    res.status(200).send(user.upvotedWords);
  } catch (e) {
    next(e);
  }
});

// Add / remove a word to downvoted words
usersRoute.post("/:userId/downvoted", async (req, res, next) => {
  const userId = req.params.userId;
  const wordId = req.body.wordId;
  const { downvotedWords } = await getUserFromId(userId);
  // Mongoose params
  const query = { _id: userId };
  let updatedArr = [];
  const options = { new: true };

  // Check if the wordId already exists in the downvotedWords array
  if (downvotedWords.includes(wordId)) {
    // If so, remove it and update
    updatedArr = downvotedWords.filter((id) => id !== wordId);
  } else {
    // If not, add it and update
    updatedArr = [...downvotedWords, wordId];
  }
  // Update document
  const updateDownvotedWords = User.findOneAndUpdate(
    query,
    { downvotedWords: updatedArr },
    options
  );

  try {
    const user = await updateDownvotedWords;
    res.status(200).send(user.downvotedWords);
  } catch (e) {
    next(e);
  }
});
