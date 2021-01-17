const usersRouter = require("express").Router();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./database.sqlite");

module.exports = usersRouter;

const getUserFromId = (id) => {
  const sql = `SELECT * FROM Users WHERE id = $id`;
  const values = { $id: id };
  db.get(sql, values, (err, user) => {
    if (err) {
      next(err);
    } else {
      console.log(user);
      return user;
    }
  });
};

const configureUserData = (user) => {
  const userData = { ...user };
  delete userData.password;
  const { upvoted_words, downvoted_words, recently_viewed } = userData;

  upvoted_words === ""
    ? (userData.upvoted_words = [])
    : (userData.upvoted_words = upvoted_words
        .split(",")
        .map((id) => Number(id))
        .slice(1));
  downvoted_words === ""
    ? (userData.downvoted_words = [])
    : (userData.downvoted_words = downvoted_words
        .split(",")
        .map((id) => Number(id))
        .slice(1));
  recently_viewed === ""
    ? (userData.recently_viewed = [])
    : (userData.recently_viewed = recently_viewed
        .split(",")
        .map((id) => Number(id))
        .filter((index) => index !== -1)
        .slice(0, 5));

  return userData;
};

const checkIfAccountExists = (req, res, next) => {
  const sql = `SELECT * FROM Users WHERE email = $email`;
  const values = { $email: req.body.newUser.email };

  db.get(sql, values, (err, user) => {
    if (err) {
      next(err);
    } else if (user) {
      res.sendStatus(400);
    } else {
      next();
    }
  });
};

// Set req.currUser param
usersRouter.param("userId", (req, res, next, userId) => {
  const sql = `SELECT * FROM Users WHERE id = $id`;
  const values = { $id: userId };

  db.get(sql, values, (err, user) => {
    if (err) {
      next(err);
    } else if (user) {
      const userData = configureUserData(user);
      req.currUser = { ...userData };
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// Get all users
usersRouter.get("/", (req, res, next) => {
  db.all(`SELECT * FROM Users`, (err, users) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ users: users });
    }
  });
});

// Add a new user
usersRouter.post("/", checkIfAccountExists, (req, res, next) => {
  const { name, email, password } = req.body.newUser;
  const sql = `INSERT INTO Users (name, email, password) VALUES ($name, $email, $password)`;
  const values = {
    $name: name,
    $email: email,
    $password: password,
  };

  db.run(sql, values, function (err) {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Users WHERE id = ${this.lastID}`, (err, user) => {
        const userData = configureUserData(user);
        res.status(201).json({ user: userData });
      });
    }
  });
});

// Used for user login
usersRouter.post("/login", (req, res, next) => {
  const { email, password } = req.body.userCreds;

  const sql = `SELECT * FROM Users WHERE email = $email AND password = $password`;
  const values = { $email: email, $password: password };

  db.get(sql, values, (err, user) => {
    if (err) {
      next(err);
    } else if (!user) {
      res.sendStatus(400);
    } else {
      const userData = configureUserData(user);
      res.status(200).json({ user: userData });
    }
  });
});

// Get a specific user
usersRouter.get("/:userId", (req, res, next) => {
  if (req.currUser) {
    res.status(200).send(req.currUser);
  } else {
    res.status(400).send();
  }
});

// Post a new word to recentlyViewedWords
usersRouter.post("/:userId/viewed-word", (req, res, next) => {
  const sql = `UPDATE Users SET recently_viewed = $wordId || "," || recently_viewed WHERE id = $userId`;
  const values = { $wordId: req.body.word_id, $userId: req.params.userId };

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get(
        `SELECT recently_viewed FROM Users WHERE id = ${req.params.userId}`,
        (err, recentlyViewed) => {
          if (err) {
            next(err);
          } else {
            const allIds = recentlyViewed.recently_viewed.split(",").map((id) => Number(id));
            const uniqueIds = allIds.filter((item, i, ar) => ar.indexOf(item) === i).slice(0, -1);

            if (uniqueIds.length < 6) {
              res.status(201).send(uniqueIds);
            } else {
              res.status(201).send(uniqueIds.slice(0, 5));
            }
          }
        }
      );
    }
  });
});

// Middleware for removing upvoted words if they are already upvoted on
const checkUpvotedWord = (req, res, next) => {
  const upvoteSql = `SELECT upvoted_words FROM Users WHERE id = ${req.params.userId}`;
  db.get(upvoteSql, (err, upvotedWordIds) => {
    if (err) {
      next(err);
    } else {
      if (upvotedWordIds.upvoted_words) {
        const idArr = upvotedWordIds.upvoted_words.split(",").map((id) => Number(id));
        if (idArr.includes(req.body.word_id)) {
          // word has already been upvoted, so remove the upvote
          const index = idArr.findIndex((ele) => ele === req.body.word_id);
          idArr.splice(index, 1);
          const sql = `UPDATE Users SET upvoted_words = $newUpvotedWords WHERE id = $id`;
          const values = { $newUpvotedWords: idArr.join(), $id: req.params.userId };
          db.run(sql, values, (err) => {
            if (err) {
              next(err);
            } else {
              res.status(200).send(idArr);
            }
          });
        } else {
          // word has not been upvoted
          next();
        }
      } else {
        // no upvotes exist at all
        next();
      }
    }
  });
};

// Add a word to upvoted words
usersRouter.post("/:userId/upvoted", checkUpvotedWord, (req, res, next) => {
  const sql = `UPDATE Users SET upvoted_words = upvoted_words || "," || $wordId WHERE id = $userId`;
  const values = { $wordId: req.body.word_id, $userId: req.params.userId };

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get(
        `SELECT upvoted_words FROM Users WHERE id = ${req.params.userId}`,
        (err, upvotedWords) => {
          if (err) {
            next(err);
          } else {
            const idArr = upvotedWords.upvoted_words
              .split(",")
              .map((id) => Number(id))
              .slice(1);
            res.status(201).send(idArr);
          }
        }
      );
    }
  });
});
// Middleware for removing downvoted words if they are already downvoted on
const checkDownvotedWord = (req, res, next) => {
  const downvoteSql = `SELECT downvoted_words FROM Users WHERE id = ${req.params.userId}`;
  db.get(downvoteSql, (err, downvotedWordIds) => {
    if (err) {
      next(err);
    } else {
      if (downvotedWordIds.downvoted_words) {
        const idArr = downvotedWordIds.downvoted_words.split(",").map((id) => Number(id));
        if (idArr.includes(req.body.word_id)) {
          // word has already been downvoted, so remove the downvote
          const index = idArr.findIndex((ele) => ele === req.body.word_id);
          idArr.splice(index, 1);
          const sql = `UPDATE Users SET downvoted_words = $newDownvotedWords WHERE id = $id`;
          const values = { $newDownvotedWords: idArr.join(), $id: req.params.userId };
          db.run(sql, values, (err) => {
            if (err) {
              next(err);
            } else {
              res.status(200).send(idArr);
            }
          });
        } else {
          // word has not been downvoted
          next();
        }
      } else {
        // no downvotes exist at all
        next();
      }
    }
  });
};

// Add a word to downvoted words
usersRouter.post("/:userId/downvoted", checkDownvotedWord, (req, res, next) => {
  const sql = `UPDATE Users SET downvoted_words = downvoted_words || "," || $wordId WHERE id = $userId`;
  const values = { $wordId: req.body.word_id, $userId: req.params.userId };

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get(
        `SELECT downvoted_words FROM Users WHERE id = ${req.params.userId}`,
        (err, downvotedWords) => {
          if (err) {
            next(err);
          } else {
            const idArr = downvotedWords.downvoted_words.split(",").map((id) => Number(id));
            res.status(201).send(idArr);
          }
        }
      );
    }
  });
});
