const { v4: uuidv4 } = require("uuid");

const words = [
  {
    word: "lamerty",
    wordId: uuidv4(),
    def: "Keyboard configuration for lame people",
    dateCreated: Date(),
    creator: "Bob",
    voteCount: 1125,
  },
  {
    word: "planterp",
    wordId: uuidv4(),
    def: 'Shorthand for the compound word "plant-terpines" (aka: marijuana)',
    dateCreated: Date(),
    creator: "Christian",
    voteCount: 12,
  },
  {
    word: "wer",
    wordId: uuidv4(),
    def: "werwerwer wer wer wer wer wer wer wer",
    dateCreated: Date(),
    creator: "Christian",
    voteCount: 25365,
  },
  {
    word: "poi",
    wordId: uuidv4(),
    def: "poipoi pio poi pio poi poi io pp io p",
    dateCreated: Date(),
    creator: "Christian Anagnostou",
    voteCount: 12,
  },
  {
    word: "asdf",
    wordId: uuidv4(),
    def: "asdfasdf asdf asdf asdf asdf asdf asdf asdf",
    dateCreated: Date(),
    creator: "Christian",
    voteCount: 9876,
  },
];

module.exports = words;
