const wordsRouter = require("express").Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.sqlite");

// Get all words
wordsRouter.get("/", (req, res, next) => {
  db.all(`SELECT * FROM Words ORDER BY id DESC LIMIT 25`, (err, words) => {
    if (err) {
      next(err);
    }
    res.status(200).json({ words: words });
  });
});

// Post a new word
wordsRouter.post("/", (req, res, next) => {
  const { word, def, creator } = req.body.newWord;
  const sql = `INSERT INTO Words (word, def, date_created, creator) VALUES ($word, $def, $dateCreated, $creator)`;
  const values = {
    $word: word,
    $def: def,
    $creator: creator,
    $dateCreated: Date.now(),
  };

  db.run(sql, values, function (err) {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Words WHERE id = ${this.lastID}`, (err, word) => {
        res.status(201).json({ word: word });
      });
    }
  });
});

// Get current votes for a specified word
wordsRouter.get("/:wordId/votes", (req, res, next) => {
  // const sql = `SELECT * FROM Words WHERE id = $wordId`;
  // db.get(``);
  const wordIndex = words.findIndex((word) => req.params.wordId === word.wordId);
  if (wordIndex !== -1) {
    const currVotes = words[wordIndex].voteCount;
    res.status(200).send(String(currVotes));
  } else {
    res.status(400).send();
  }
});

// Get the top 5 most voted words
wordsRouter.get("/top-words", (req, res, next) => {
  const sql = `SELECT * FROM Words ORDER BY vote_count DESC LIMIT 3`;
  db.all(sql, (err, words) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ words: words });
    }
  });
});

// Update the voteCount for a specified word
wordsRouter.post("/:wordId/vote", (req, res, next) => {
  const upvoteSql = `UPDATE Words SET vote_count = vote_count + 1 WHERE id = $id`;
  const upvoteTwoSql = `UPDATE Words SET vote_count = vote_count + 2 WHERE id = $id`;
  const downvoteSql = `UPDATE Words SET vote_count = vote_count - 1 WHERE id = $id`;
  const downvoteTwoSql = `UPDATE Words SET vote_count = vote_count - 2 WHERE id = $id`;

  const values = { $id: req.params.wordId };

  const getWordFromDB = (err) => {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Words WHERE id = ${req.params.wordId}`, (err, word) => {
        if (err) {
          next(err);
        } else {
          res.status(200).send({ wordId: Number(req.params.wordId), voteCount: word.vote_count });
        }
      });
    }
  };

  switch (req.body.direction) {
    case "up 1":
      db.run(upvoteSql, values, (err) => {
        getWordFromDB(err);
      });
      break;
    case "up 2":
      db.run(upvoteTwoSql, values, (err) => {
        getWordFromDB(err);
      });
      break;
    case "down 1":
      db.run(downvoteSql, values, (err) => {
        getWordFromDB(err);
      });
      break;
    case "down 2":
      db.run(downvoteTwoSql, values, (err) => {
        getWordFromDB(err);
      });
      break;
    default:
      next(new Error("Bad vote"));
  }
});

// Search is any words contain a specified term
wordsRouter.get("/search/:term", (req, res, next) => {
  const sql = `SELECT * FROM Words WHERE word LIKE '%${req.params.term}%'`;

  db.all(sql, (err, words) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ words: words });
    }
  });
});

// Order words by specified order
wordsRouter.get("/order-by/:order", (req, res, next) => {
  let sql = "";
  switch (req.params.order) {
    case "top":
      sql = "SELECT * FROM Words ORDER BY vote_count DESC LIMIT 25";
      break;
    case "new":
      sql = "SELECT * FROM Words ORDER BY date_created DESC LIMIT 25";
      break;
    case "hot":
      sql = `SELECT * FROM Words WHERE (${Date.now()} - date_created) < 86400000 ORDER BY vote_count DESC, date_created DESC;`;
      break;
    default:
      res.sendStatus(500);
  }

  db.all(sql, (err, words) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ words: words });
    }
  });
});

module.exports = wordsRouter;
