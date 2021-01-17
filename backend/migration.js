const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS Users`);
  db.run(`DROP TABLE IF EXISTS Words`);
  // Users table
  db.run(`CREATE TABLE Users (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    accountCreated INTEGER DEFAULT ${Date.now()},
    upvoted_words TEXT DEFAULT '-1',
    downvoted_words TEXT DEFAULT '-1',
    recently_viewed TEXT DEFAULT '-1'
  );`);
  // Words table
  db.run(`CREATE TABLE Words (
    id INTEGER NOT NULL PRIMARY KEY,
    word TEXT NOT NULL,
    def TEXT NOT NULL,
    date_created INTEGER NOT NULL DEFAULT ${Date.now()},
    vote_count INTEGER DEFAULT 0,
    creator TEXT NOT NULL,
    FOREIGN KEY(creator) REFERENCES Users(id)
  )`);

  // Populate Words
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('lamerty', 'Keyboard configuration for lame people', 1000, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def, date_created, vote_count, creator) 
    VALUES ('planterp', 'Shorthand for the compound word "plant-terpines" (aka: marijuana)', 123, 100, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('werwer', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('poipoi', 'Keyboard configuration for lame people', 1000, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('a', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('b', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('c', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('d', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('e', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('f', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('g', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('h', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('i', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('j', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('k', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('l', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('m', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('n', 'Keyboard configuration for lame people', 50, 'Christian')`
  );
  db.run(
    `INSERT INTO Words (word, def,vote_count, creator) 
    VALUES ('o', 'Keyboard configuration for lame people', 50, 'Christian')`
  );

  // Populate Users
  db.run(
    `INSERT INTO Users (name, email, password) 
    VALUES ('Christian', 'christian0722@gmail.com', '123');`
  );
});

// name: "Christian Anagnostou",
// email: "christian0722@gmail.com",
// password: "123",
// accountCreated: new Date().toDateString(),
// userId: 0,
// recentlyViewedWords: [],
// upvotedWords: [],
// downvotedWords: [],
