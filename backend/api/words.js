const wordsRouter = require("express").Router();

const words = [
  { word: "lamerty", wordId: 1, def: "Keyboard configuration for lame people" },
  { word: "okery", wordId: 2, def: "Idiots trying to use the word okay" },
  {
    word: "planterp",
    wordId: 3,
    def: 'Shorthand for the compound word "plant-terpines" (aka: marijuana)',
  },
  { word: "yungerty", wordId: 4, def: "Young persons under the legal age of smoking marijuana" },
];

wordsRouter.get("/", (req, res, next) => {
  res.send(words);
});

wordsRouter.post("/", (req, res, next) => {
  console.log(req.body.newWordData);
  words.push(req.body.newWordData);
  res.send(words);
});

module.exports = wordsRouter;
