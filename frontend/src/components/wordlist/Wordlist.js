import React, { useEffect } from "react";
// Router
import { Link } from "react-router-dom";
// Components
import WordVotes from "./WordVotes";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { orderWordsBy } from "../../redux/actions/wordsActions";
import { addViewedWord } from "../../redux/actions/userActions";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { container, item } from "../../animation";
import WordSorting from "./WordSorting";
// Utils
import { getTimePassed, capitalizeFirstLetter } from "../../utils/utils";

function Wordlist() {
  const words = useSelector((state) => state.words);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderWordsBy("new"));
  }, [dispatch]);

  const handleWordClick = (wordId) => {
    user.loggedIn && dispatch(addViewedWord(wordId, user.id));
  };

  return (
    <WordListContainer className="wordlist" variants={container} initial="hidden" animate="show">
      <WordSorting />
      {words.map((word) => {
        return (
          <WordItem key={word.id} variants={item}>
            <WordVotes word={word} />
            <Link
              to={`/word/${word.word}`}
              key={word.id}
              onClick={() => handleWordClick(word.id)}
              className="item-link"
            >
              <p className="word-text">
                {capitalizeFirstLetter(word.word)}
                <span className="word-def"> - {word.def}</span>
              </p>

              <p className="word-creation">
                Posted by: {word.creator} {getTimePassed(word.date_created)}
              </p>
            </Link>
          </WordItem>
        );
      })}
    </WordListContainer>
  );
}
const WordListContainer = styled(motion.ul)`
  padding: 1rem;
`;

const WordItem = styled(motion.li)`
  background: ${({ theme }) => theme.lightBg};
  border: 1px solid ${({ theme }) => theme.medBg};
  list-style: none;
  margin: 0.5rem 0;
  border-radius: 4px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid rgb(167, 167, 167);
    background: ${({ theme }) => theme.darkBg};
  }

  .item-link {
    color: ${({ theme }) => theme.darkText};
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    padding: 1rem;
    .word-text {
      color: ${({ theme }) => theme.darkText};
      font-size: 1.2rem;
    }
    .word-def {
      font-size: 1rem;

      font-weight: 100;
    }
    .word-creation {
      color: ${({ theme }) => theme.lightText};
      font-weight: 100;
      font-size: 0.75rem;
    }
  }
`;

export default Wordlist;
