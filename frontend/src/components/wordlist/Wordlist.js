import React from "react";
import { Link } from "react-router-dom";
import WordVotes from "./wordVotes/WordVotes";

function Wordlist({ words, handleAddViewedWord, loggedIn, upvotedWords, setUpvotedWords }) {
  const handleWordClick = (wordId) => {
    handleAddViewedWord(wordId);
  };

  return (
    <ul className="wordlist">
      {words.map((word) => {
        return (
          <li className="word-item" key={word.wordId}>
            <WordVotes
              word={word}
              loggedIn={loggedIn}
              upvotedWords={upvotedWords}
              setUpvotedWords={setUpvotedWords}
            />
            <Link to={`/${word.word}`} key={word.word} onClick={() => handleWordClick(word.wordId)}>
              <span className="word-text">{word.word.toUpperCase()}</span>
              <span className="word-def">{word.def}</span>
              <span className="word-creator">Creator: {word.creator}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Wordlist;
