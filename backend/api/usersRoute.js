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

// // Add a new user
// usersRoute.post("/", checkIfAccountExists, (req, res, next) => {
//   const { name, email, password } = req.body.newUser;
//   const sql = `INSERT INTO Users (name, email, password) VALUES ($name, $email, $password)`;
//   const values = {
//     $name: name,
//     $email: email,
//     $password: password,
//   };

//   db.run(sql, values, function (err) {
//     if (err) {
//       next(err);
//     } else {
//       db.get(`SELECT * FROM Users WHERE id = ${this.lastID}`, (err, user) => {
//         const userData = configureUserData(user);
//         res.status(201).json({ user: userData });
//       });
//     }
//   });
// });

// Used for user login
usersRoute.post("/login", async (req, res, next) => {
  const { email, password } = req.body.userCreds;
  const userResult = User.findOne({ email: email, password: password });

  try {
    const userData = await userResult;
    delete userData.password;
    if (userData) {
      res.status(200).json(userData);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    next(err);
  }
});

// Post a new word to recentlyViewedWords
usersRoute.post("/:userId/viewed-word", async (req, res, next) => {
  const userId = req.params.userId;
  const newWord = req.body.word;
  const { viewHistory } = await getUserFromId(userId);

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
