const { v4: uuidv4 } = require("uuid");

const users = [
  {
    name: "Christian Anagnostou",
    email: "christian0722@gmail.com",
    password: "123",
    accountCreated: new Date().toDateString(),
    userId: "123-123-123",
    recentlyViewedWords: [],
    upvotedWords: [],
    downvotedWords: [],
  },
  {
    name: "Bad Baby",
    email: "bad@gmail.com",
    password: "123",
    accountCreated: new Date().toDateString(),
    userId: uuidv4(),
    recentlyViewedWords: [],
    upvotedWords: [],
    downvotedWords: [],
  },
];

module.exports = users;
