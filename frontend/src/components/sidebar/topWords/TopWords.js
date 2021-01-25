import React, { useState, useEffect } from "react";
import axios from "axios";
// Router
import { Link } from "react-router-dom";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function TopWords() {
  const [topFiveWords, setTopWords] = useState([]);

  const getTopWords = async () => {
    const topWords = await axios.get("/api/words/top-words");
    setTopWords(topWords.data.words);
  };

  useEffect(() => {
    getTopWords();
  }, []);

  return (
    <TopWordsDiv className="top-words">
      <h3>Top Words</h3>
      <ul>
        {topFiveWords.map((word) => {
          return (
            <li key={word._id}>
              <Link to={`/word/${word.word}`}>
                <p>
                  {word.word}
                  <span>{word.voteCount} votes</span>
                </p>
                <p>{word.def}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </TopWordsDiv>
  );
}

const TopWordsDiv = styled(motion.div)`
  background: ${({ theme }) => theme.lightBg};
  color: ${({ theme }) => theme.darkText};
  padding: 1rem;
  height: fit-content;
  ul {
    list-style: none;
    li {
      border-radius: 3px;
      display: inline-block;
      height: fit-content;
      width: 100%;
      margin: 0.2rem 0;
      &:first-child {
        background: rgba(255, 217, 0, 0.623);
        border: 1px solid gold;
        &:hover {
          background: gold;
        }
      }
      &:nth-child(2) {
        background: rgba(192, 192, 192, 0.651);
        border: 1px solid rgb(209, 209, 209);
        &:hover {
          background: rgb(196, 196, 196);
        }
      }
      &:nth-child(3) {
        background: rgba(255, 166, 0, 0.363);
        border: 1px solid rgba(255, 166, 0, 0.589);
        &:hover {
          background: rgba(255, 166, 0, 0.486);
        }
      }
      a {
        color: ${({ theme }) => theme.darkText};
        height: fit-content;
        display: flex;
        flex-direction: column;
        padding: 0.25rem 0.5rem;
        &:hover {
          color: ${({ theme }) => theme.black};
        }
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          justify-self: flex-end;
        }
        p:first-child {
          font-weight: 400;
          text-transform: capitalize;
          span {
            text-transform: none;
            font-weight: 100;
            font-size: 0.75rem;
            float: right;
          }
        }
        p:last-child {
          font-weight: 100;
          font-size: 0.75rem;
        }
      }
    }
  }
`;

export default TopWords;
