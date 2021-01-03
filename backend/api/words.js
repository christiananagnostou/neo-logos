const wordsRouter = require("express").Router();
const { v4: uuidv4 } = require("uuid");

module.exports = wordsRouter;

const words = [
  {
    word: "lamerty",
    wordId: uuidv4(),
    def: "Keyboard configuration for lame people",
    dateCreated: Date(),
    creator: "Bob",
  },
  {
    word: "okery",
    wordId: uuidv4(),
    def: "Idiots trying to use the word okay",
    dateCreated: Date(),
    creator: "Christian",
  },
  {
    word: "planterp",
    wordId: uuidv4(),
    def: 'Shorthand for the compound word "plant-terpines" (aka: marijuana)',
    dateCreated: Date(),
    creator: "Christian",
  },
];

wordsRouter.get("/", (req, res, next) => {
  res.status(200).send(words);
});

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
