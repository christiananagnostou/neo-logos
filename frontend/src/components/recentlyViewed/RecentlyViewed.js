import React from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function RecentlyViewed() {
  const { recentlyViewedWords } = useSelector((state) => state.user);

  return (
    <RecentlyViewedContainer className="recently-viewed">
      <h3>RECENTLY VIEWED</h3>
      <ul>
        {recentlyViewedWords.map((word) => {
          return (
            <Link to={`/word/${word.word}`} key={word.word}>
              <li>
                <p>{word.word}</p>
                <p>{word.def}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </RecentlyViewedContainer>
  );
}

const RecentlyViewedContainer = styled(motion.div)`
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
      background: white;
      margin: 0.5rem 0;
      height: 3rem;
      display: flex;
      flex-direction: column;
      padding: 0.25rem 0.5rem;
      p:first-child {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 600;
        justify-self: flex-end;
        text-transform: capitalize;
      }
      p:last-child {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 100;
        justify-self: flex-end;
      }
    }
  }
`;

export default RecentlyViewed;
