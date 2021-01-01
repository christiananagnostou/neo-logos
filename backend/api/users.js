const usersRouter = require("express").Router();
const { v4: uuidv4 } = require("uuid");

module.exports = usersRouter;

const users = [
  {
    name: "Christian",
    email: "christian0722@gmail.com",
    password: "123",
    accountCreated: "Dec 30, 2020",
    userId: uuidv4(),
  },
  {
    name: "Bad",
    email: "bad@gmail.com",
    password: "badPW",
    accountCreated: "Dec 10, 2020",
    userId: uuidv4(),
  },
];
const getUserFromCreds = (id) => {
  const currUser = users.find((user) => user.email === id);
  return currUser;
};

// Get all users
usersRouter.get("/", (req, res, next) => {
  res.status(200).send(users);
});

// Add a new user
usersRouter.post("/", (req, res, next) => {
  const userIndex = users.findIndex((user) => req.body.newUser.email === user.email);
  if (userIndex === -1) {
    req.body.newUser.userId = uuidv4();
    users.push(req.body.newUser);
    res.status(201).send(req.body.newUser);
  } else {
    res.status(400).send();
  }
});

// Set req.currUser
usersRouter.param("userId", (req, res, next, id) => {
  const currUser = getUserFromCreds(id);
  req.currUser = currUser;
  next();
});

// Get a specific user
usersRouter.get("/:userId", (req, res, next) => {
  if (req.currUser) {
    res.status(200).send(req.currUser);
  } else {
    res.status(400).send();
  }
});
