const wordsRoute = require("express").Router();
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
  const topWords = Word.find({}).sort("-voteCount").limit(3);

  try {
    const results = await topWords;
    res.status(200).json({ words: results });
  } catch (e) {
    next(e);
  }
});

// Update the voteCount for a specified word
wordsRoute.post("/:wordId/vote", async (req, res, next) => {
  const wordId = req.params.wordId;

  const filterQuery = { _id: wordId };
  const upvoteOne = { $inc: { voteCount: 1 } };
  const upvoteTwo = { $inc: { voteCount: 2 } };
  const downvoteOne = { $inc: { voteCount: -1 } };
  const downvoteTwo = { $inc: { voteCount: -2 } };
  const options = { new: true };

  const updateDatabase = async (voteType) => {
    const updatedWordRequest = Word.findOneAndUpdate(filterQuery, voteType, options);
    try {
      const updatedWord = await updatedWordRequest;
      res.status(200).json(updatedWord);
    } catch (e) {
      next(e);
    }
  };

  switch (req.body.direction) {
    case "up 1":
      updateDatabase(upvoteOne);
      break;
    case "up 2":
      updateDatabase(upvoteTwo);
      break;
    case "down 1":
      updateDatabase(downvoteOne);
      break;
    case "down 2":
      updateDatabase(downvoteTwo);
      break;
    default:
      next(new Error("Bad vote"));
  }
});

// Search if any words contain a specified term
wordsRoute.get("/search/:term", async (req, res, next) => {
  const searchQuery = Word.find({ word: { $regex: `.*${req.params.term}.*` } })
    .sort("-voteCount")
    .limit(50);

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
      order = "-voteCount";
      break;
    case "new":
      order = "-dateCreated";
      break;
    case "hot":
      order = "-voteCount -dateCreated";
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
    res.status(200).send(wordHistory);
  } catch (e) {
    next(e);
    p;
  }
});
