const wordsRouter = require("express").Router();

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
wordsRouter.post("/new-word", (req, res, next) => {
  const wordIndex = words.findIndex((word) => req.body.newWord.word === word.word);
  if (wordIndex === -1) {
    req.body.newWord.wordId = words.length;
    words.unshift(req.body.newWord);
    res.status(201).send(words[0]);
  } else {
    res.status(400).send();
  }
});

// Update the voteCount for a specified word
wordsRouter.post("/:wordId/vote", (req, res, next) => {
  const wordIndex = words.findIndex((word) => Number(req.params.wordId) === word.wordId);
  if (wordIndex !== -1) {
    switch (req.body.direction) {
      case "up":
        words[wordIndex].voteCount += 1;
        break;
      case "down":
        words[wordIndex].voteCount -= 1;
        break;
    }
    words[wordIndex].voteCount;
    res
      .status(200)
      .send({ wordId: Number(req.params.wordId), voteCount: words[wordIndex].voteCount });
  } else {
    res.status(400).send();
  }
});
