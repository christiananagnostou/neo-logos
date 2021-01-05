const wordsRouter = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const words = require("./DB/wordDB");

module.exports = wordsRouter;

// Get all words
wordsRouter.get("/", (req, res, next) => {
  res.status(200).send(words);
});

// Get current votes for a specified word
wordsRouter.get("/:wordId/votes", (req, res, next) => {
  const wordIndex = words.findIndex((word) => req.params.wordId === word.wordId);
  if (wordIndex !== -1) {
    const currVotes = words[wordIndex].voteCount;
    res.status(200).send(String(currVotes));
  } else {
    res.status(400).send();
  }
});

// Get the top 5 most voted words
wordsRouter.get("/top-five", (req, res, next) => {
  const topFive = [...words].sort((a, b) => b.voteCount - a.voteCount).slice(0, 5);
  res.send(topFive);
});

// Post a new word to words
wordsRouter.post("/", (req, res, next) => {
  if (req.body.type === "post-new-word") {
    const wordIndex = words.findIndex((word) => req.body.newWordData.word === word.word);
    if (wordIndex === -1) {
      req.body.newWordData.wordId = uuidv4();
      words.push(req.body.newWordData);
      res.status(201).send(words[wordIndex]);
    } else {
      res.status(400).send();
    }
  } else {
    next();
  }
});

// Get recently viewed words from IDs
wordsRouter.post("/", (req, res, next) => {
  if (req.body.type === "get-recently-viewed") {
    const viewedWords = words.filter((word) => req.body.visitedWordIds.includes(word.wordId));
    if (viewedWords) {
      res.status(200).send(viewedWords);
    } else {
      res.status(400).send();
    }
  } else {
    next();
  }
});

// Update the voteCount for a specified word
wordsRouter.put("/:wordId/votes", (req, res, next) => {
  const wordIndex = words.findIndex((word) => req.params.wordId === word.wordId);
  if (wordIndex !== -1) {
    words[wordIndex].voteCount = req.body.voteCount;
    res.status(200).send();
  } else {
    res.status(400).send();
  }
});
