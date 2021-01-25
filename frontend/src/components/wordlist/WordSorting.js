import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Redux
import { useDispatch } from "react-redux";
import { orderWordsBy } from "../../redux/actions/wordsActions";

function WordSorting({ setWordsDisplayPage }) {
  const dispatch = useDispatch();

  const handleSort = (order) => {
    dispatch(orderWordsBy(order, 1));
    setWordsDisplayPage(1);
  };

  return (
    <SortingOptions>
      <li>
        <button onClick={() => handleSort("hot")}>Hot</button>
      </li>
      <li>
        <button onClick={() => handleSort("new")}>New</button>
      </li>
      <li>
        <button onClick={() => handleSort("top")}>Top</button>
      </li>
    </SortingOptions>
  );
}

const SortingOptions = styled(motion.ul)`
  display: flex;
  list-style: none;
  li {
    background: ${({ theme }) => theme.medText};
    display: block;
    margin-right: 2rem;
    padding: 3px 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    &:hover {
      box-shadow: -2px 2px 1px ${({ theme }) => theme.shadow};
      background: ${({ theme }) => theme.darkText};
      transform: translate(1px, -1px);
    }
    &:active {
      transform: translate(-1px, 1px);
      box-shadow: none;
    }
    button {
      color: ${({ theme }) => theme.lightBg};
      background: transparent;
      border: none;
      font-family: "Montserrat", sans-serif;
      font-weight: 300;
      font-size: 1.3rem;
      &:focus {
        outline: none;
        box-shadow: 0 0 3px black;
      }
    }
  }
  @media (max-width: 700px) {
    li {
      margin-right: 1rem;

      &:hover {
        background: ${({ theme }) => theme.medText};
        box-shadow: none;
        transform: none;
      }
      &:active {
        background: ${({ theme }) => theme.darkText};
        transform: scale(0.95);
      }
      button {
        font-size: 1em;
      }
    }
  }
`;

export default WordSorting;
