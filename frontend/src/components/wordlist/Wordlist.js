import React, { useEffect } from "react";
// Router
import { Link } from "react-router-dom";
// Components
import WordVotes from "./wordVotes/WordVotes";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllWords } from "../../redux/actions/wordsActions";
import { addViewedWord } from "../../redux/actions/userActions";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { container, item } from "../../animation";

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
    <WordListContainer className="wordlist" variants={container} initial="hidden" animate="show">
      {words.map((word) => {
        return (
          <WordItem key={word.word} layoutId={word.word} variants={item}>
            <WordVotes word={word} />
            <Link to={`/word/${word.word}`} key={word.word} onClick={() => handleWordClick(word)}>
              <span className="word-text">{word.word.toUpperCase()}</span>
              <span className="word-def">{word.def}</span>
              <span className="word-creator">Creator: {word.creator}</span>
            </Link>
          </WordItem>
        );
      })}
    </WordListContainer>
  );
}
const WordListContainer = styled(motion.ul)`
  padding: 1rem;
  background: rgb(195, 221, 245);
  box-shadow: 0 5px 10px grey;
`;
const WordItem = styled(motion.li)`
  height: fit-content;
  list-style: none;
  margin: 0.5rem 0;
  border: 1px solid rgb(202, 202, 202);
  border-radius: 0.5rem;
  overflow: hidden;
  background: white;
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid rgb(167, 167, 167);
    background: rgb(240, 240, 240);
  }
  a {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
    padding: 0 1rem;
    .word-creator {
      text-align: right;
    }
  }
`;

export default Wordlist;
