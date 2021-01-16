import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Redux
import { useDispatch } from "react-redux";
import { orderWordsBy } from "../../redux/actions/wordsActions";

function WordSorting() {
  const dispatch = useDispatch();

  const handleSort = (order) => {
    dispatch(orderWordsBy(order));
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
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    &:hover {
      box-shadow: 3px 3px 0px ${({ theme }) => theme.shadow};
      background: ${({ theme }) => theme.darkText};
      transform: translate(-1px, -1px);
    }
    &:active {
      transform: translate(1px, 1px);
      box-shadow: none;
    }
    button {
      color: ${({ theme }) => theme.lightBg};
      background: transparent;
      border: none;
      font-family: "Montserrat", sans-serif;
      font-weight: 100;
      font-size: 1.3rem;
      &:focus {
        outline: none;
        box-shadow: 0 0 3px black;
      }
    }
  }
`;

export default WordSorting;
