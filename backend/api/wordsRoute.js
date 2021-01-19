const wordsRoute = require("express").Router();
// const sqlite3 = require("sqlite3");
// const db = new sqlite3.Database("./database.sqlite");
const Word = require("../models/Word");
module.exports = wordsRoute;

// Post a new word
wordsRoute.post("/", async (req, res, next) => {
  const { word, def, creator } = req.body.newWord;

  const newWord = new Word({
    word: word,
    def: def,
    creator: creator,
  });

  try {
    const savedWord = await newWord.save();
    console.log(savedWord);
    res.status(201).json({ word: savedWord });
  } catch (e) {
    res.sendStatus(500);
  }
});

// Get all words
wordsRoute.get("/", async (req, res, next) => {
  const allWords = Word.find({}).limit(25);

  try {
    const results = await allWords;
    res.status(200).json({ words: results });
  } catch (e) {
    next(e);
  }
});

// Get the top 5 most voted words
wordsRoute.get("/top-words", async (req, res, next) => {
  const topWords = Word.find({}).sort("-upvotes").limit(3);

  try {
    const results = await topWords;
    res.status(200).json({ words: results });
  } catch (e) {
    next(e);
  }
});

// // Update the voteCount for a specified word
// wordsRoute.post("/:wordId/vote", (req, res, next) => {
//   const upvoteSql = `UPDATE Words SET vote_count = vote_count + 1 WHERE id = $id`;
//   const upvoteTwoSql = `UPDATE Words SET vote_count = vote_count + 2 WHERE id = $id`;
//   const downvoteSql = `UPDATE Words SET vote_count = vote_count - 1 WHERE id = $id`;
//   const downvoteTwoSql = `UPDATE Words SET vote_count = vote_count - 2 WHERE id = $id`;

//   const values = { $id: req.params.wordId };

//   const getWordFromDB = (err) => {
//     if (err) {
//       next(err);
//     } else {
//       db.get(`SELECT * FROM Words WHERE id = ${req.params.wordId}`, (err, word) => {
//         if (err) {
//           next(err);
//         } else {
//           res.status(200).send({ wordId: Number(req.params.wordId), voteCount: word.vote_count });
//         }
//       });
//     }
//   };

//   switch (req.body.direction) {
//     case "up 1":
//       db.run(upvoteSql, values, (err) => {
//         getWordFromDB(err);
//       });
//       break;
//     case "up 2":
//       db.run(upvoteTwoSql, values, (err) => {
//         getWordFromDB(err);
//       });
//       break;
//     case "down 1":
//       db.run(downvoteSql, values, (err) => {
//         getWordFromDB(err);
//       });
//       break;
//     case "down 2":
//       db.run(downvoteTwoSql, values, (err) => {
//         getWordFromDB(err);
//       });
//       break;
//     default:
//       next(new Error("Bad vote"));
//   }
// });

// Search if any words contain a specified term
wordsRoute.get("/search/:term", async (req, res, next) => {
  const searchQuery = Word.find({ word: { $regex: `.*${req.params.term}.*` } }).sort("-upvotes").limit(50);

  try {
    const searchResults = await searchQuery;
    res.status(200).send({ words: searchResults });
  } catch (e) {
    next(e);
  }
});

// Order words by top / new / hot
wordsRoute.get("/order-by/:order", async (req, res, next) => {
  let order;

  switch (req.params.order) {
    case "top":
      order = "-upvotes";
      break;
    case "new":
      order = "-dateCreated";
      break;
    case "hot":
      order = "-upvotes dateCreated";
      break;
    default:
      res.sendStatus(500);
  }

  const query = Word.find({}).sort(order).limit(25);

  try {
    const result = await query;
    res.status(200).json({ words: result });
  } catch (e) {
    next(e);
  }
});

// Take in an array of word id's and respond with all corresponding word info
wordsRoute.post("/id-to-word", async (req, res, next) => {
  const viewHistory = req.body.viewHistory;

  const wordHistoryRequest = Word.find().where("_id").in(viewHistory).exec();

  // const wordHistoryRequest = Word.find({ records: viewHistory });

  try {
    const wordHistory = await wordHistoryRequest;
    console.log(wordHistory);
    res.status(200).send(wordHistory);
  } catch (e) {
    next(e);
  }
});
