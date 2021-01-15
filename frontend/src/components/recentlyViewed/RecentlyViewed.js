import React from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function RecentlyViewed() {
  const { recently_viewed } = useSelector((state) => state.user);

  return (
    <RecentlyViewedContainer className="recently-viewed">
      <h3>Recently Viewed</h3>
      <ul>
        {recently_viewed.map((word) => {
          return (
            <Link to={`/word/${word.word}`} key={word.id}>
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
  overflow-y: scroll;
  color: rgb(245, 203, 92);
  
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
