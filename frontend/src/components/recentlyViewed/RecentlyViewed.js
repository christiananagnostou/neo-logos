import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
// Router
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function RecentlyViewed() {
  const { recently_viewed, loggedIn } = useSelector((state) => state.user);
  const [recentsDisplay, setRecentsDisplay] = useState([]);

  const getWordsFromIdArray = useCallback(async () => {
    const recentlyViewedWords = await axios.post("http://localhost:4001/api/words/id-to-word", {
      recently_viewed,
    });
    setRecentsDisplay([...recentlyViewedWords.data.words]);
  }, [recently_viewed]);

  useEffect(() => {
    if (loggedIn && recently_viewed.length > 0) {
      getWordsFromIdArray();
    }
  }, [recently_viewed, getWordsFromIdArray, loggedIn]);

  return (
    <RecentlyViewedContainer className="recently-viewed">
      <h3>Recently Viewed</h3>
      <ul>
        {recentsDisplay.map((word) => {
          return (
            <li key={word.id}>
              <Link to={`/word/${word.word}`}>
                <p>
                  {word.word}
                  <span>{word.vote_count} votes</span>
                </p>
                <p>{word.def}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </RecentlyViewedContainer>
  );
}

const RecentlyViewedContainer = styled(motion.div)`
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
      background: ${({ theme }) => theme.medBg};
        &:hover {
          background: ${({ theme }) => theme.darkBg};
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
  }
`;

export default RecentlyViewed;
