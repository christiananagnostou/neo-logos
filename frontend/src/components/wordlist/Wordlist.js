import React, { useState, useEffect } from "react";
// Router
import { Link } from "react-router-dom";
// Components
import WordVotes from "./WordVotes";
import DeleteWord from "./DeleteWord";
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
  const { wordsDisplay, wordsSorting } = useSelector((state) => state.words);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Current Page
  const [wordsDisplayPage, setWordsDisplayPage] = useState(1);

  useEffect(() => {
    dispatch(orderWordsBy(wordsSorting, wordsDisplayPage));
    // eslint-disable-next-line
  }, []);

  const handleWordClick = (word) => {
    user.loggedIn && dispatch(addViewedWord(word, user._id));
  };

  const handlePageChange = (direction) => {
    switch (direction) {
      case "prev":
        if (wordsDisplayPage > 1) {
          dispatch(orderWordsBy(wordsSorting, wordsDisplayPage - 1));
          setWordsDisplayPage(wordsDisplayPage - 1);
        }
        break;
      case "next":
        if (wordsDisplay.length === 25) {
          dispatch(orderWordsBy(wordsSorting, wordsDisplayPage + 1));
          setWordsDisplayPage(wordsDisplayPage + 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <WordListContainer className="wordlist" variants={container} initial="hidden" animate="show">
      <WordSorting setWordsDisplayPage={setWordsDisplayPage} />
      {wordsDisplay.map((word) => {
        return (
          <WordItem key={word._id} variants={item}>
            <WordVotes word={word} />
            <Link
              to={`/word/${word.word}`}
              key={word._id}
              onClick={() => handleWordClick(word)}
              className="item-link"
            >
              <p className="word-text">
                {capitalizeFirstLetter(word.word)}
                <span className="word-def"> - {word.def}</span>
              </p>

              <p className="word-creation">
                Posted by:{" "}
                <span>
                  {word.creator} {getTimePassed(word.dateCreated)}
                </span>
              </p>
            </Link>
            {word.creator === user.name && <DeleteWord word={word} />}
          </WordItem>
        );
      })}
      <WordListNav>
        <div className="btn" onClick={() => handlePageChange("prev")}>
          Prev
        </div>
        <div className="btn" onClick={() => handlePageChange("next")}>
          Next
        </div>
      </WordListNav>
    </WordListContainer>
  );
}
const WordListContainer = styled(motion.ul)`
  padding: 1rem;
  @media (max-width: 700px) {
    padding: 1rem 0.5rem;
  }
`;

const WordItem = styled(motion.li)`
  position: relative;
  background: ${({ theme }) => theme.lightBg};
  border: 1px solid ${({ theme }) => theme.medBg};
  list-style: none;
  margin: 0.5rem 0;
  border-radius: 4px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 55px 1fr;
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
    grid-template-rows: 1fr 1.5rem;
    padding: 0.5rem 0.25rem 0;
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
      span {
        font-weight: 300;
      }
    }
  }
  @media (max-width: 700px) {
    grid-template-columns: 40px 1fr;

    &:hover {
      border: 1px solid ${({ theme }) => theme.medBg};
      background: ${({ theme }) => theme.lightBg};
    }
    &:active {
      border: 1px solid rgb(167, 167, 167);
      background: ${({ theme }) => theme.darkBg};
    }
  }
`;

const WordListNav = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  .btn {
    width: fit-content;
    color: ${({ theme }) => theme.lightBg};
    background: ${({ theme }) => theme.medText};
    padding: 0.4rem 1.5rem;
    margin-top: 0.5rem;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    font-family: "Montserrat", sans-serif;
    font-weight: 300;
    font-size: 1.2rem;
    align-self: end;
    transition: all 0.1s ease-in-out;
    outline: none;
    &:hover {
      box-shadow: -2px 2px 1px ${({ theme }) => theme.shadow};
      background: ${({ theme }) => theme.darkText};
      transform: translate(1px, -1px);
    }
    &:active {
      transform: translate(-1px, 1px);
      box-shadow: none;
    }
  }
  @media (max-width: 700px) {
    .btn {
      font-size: 1em;
      &:hover {
        background: ${({ theme }) => theme.medText};
        box-shadow: none;
        transform: none;
      }
      &:active {
        background: ${({ theme }) => theme.darkText};
        transform: scale(0.95);
      }
    }
  }
`;

export default Wordlist;
