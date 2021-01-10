import React, { useEffect } from "react";
// Router
import { Link } from "react-router-dom";
// Components
import WordVotes from "./wordVotes/WordVotes";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllWords } from "../../redux/actions/wordsActions";
import { addViewedWord } from "../../redux/actions/userActions";

function Wordlist() {
  const words = useSelector((state) => state.words);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWords());
  }, [dispatch]);

  const handleWordClick = (word) => {
    user.loggedIn && dispatch(addViewedWord(word, user.userId));
  };

  return (
    <ul className="wordlist">
      {words.map((word) => {
        return (
          <li className="word-item" key={word.wordId}>
            <WordVotes word={word} />
            <Link to={`/${word.word}`} key={word.word} onClick={() => handleWordClick(word)}>
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
