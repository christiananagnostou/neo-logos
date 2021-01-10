import React, { useState, useEffect } from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function TopWords() {
  // Redux
  const words = useSelector((state) => state.words);
  const [topFiveWords, setTopFiveWords] = useState([]);

  useEffect(() => {
    setTopFiveWords([...words].sort((a, b) => b.voteCount - a.voteCount).slice(0, 3));
  }, [words]);

  return (
    <TopWordsDiv>
      <h3>TOP WORDS</h3>
      <ul>
        {topFiveWords.map((word) => {
          return (
            <li>
              <Link to={`/word/${word.word}`} key={word.word}>
                <p>
                  {word.word}
                  <span>{word.voteCount}</span>
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
  padding: 1rem;
  background: rgb(195, 221, 245);
  box-shadow: 0 5px 10px grey;
  overflow-y: scroll;
  h3 {
    font-weight: 100;
  }
  ul {
    list-style: none;
    li {
      border-radius: 0.4rem;
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
        height: 3rem;
        display: flex;
        flex-direction: column;
        padding: 0.25rem 0.5rem;
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          justify-self: flex-end;
        }
        p:first-child {
          font-weight: 600;
          text-transform: capitalize;
          span {
            font-weight: 100;
            font-size: 0.75rem;
            float: right;
          }
        }
        p:last-child {
          font-weight: 100;
        }
      }
    }
  }
`;

export default TopWords;
