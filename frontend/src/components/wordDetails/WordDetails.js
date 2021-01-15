import React from "react";
// Router
import { useHistory } from "react-router-dom";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import WordVotes from "../wordlist/wordVotes/WordVotes";
// Utils
import { timeConverter } from "../../utils/utils";

function WordDetails({ selectedWord }) {
  // Router
  const history = useHistory();

  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      history.push("/");
    }
  };

  return (
    <>
      {selectedWord && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <WordPage layoutId={selectedWord.word} key={selectedWord.word}>
            <WordVotes word={selectedWord} />
            <div>
              <p>{selectedWord.word}</p>
              <p>{selectedWord.def}</p>
              <p>{timeConverter(selectedWord.date_created)}</p>
              <p>{selectedWord.creator}</p>
              <p>{selectedWord.id}</p>
            </div>
          </WordPage>
        </CardShadow>
      )}
    </>
  );
}

const CardShadow = styled(motion.div)`
  z-index: 999;
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b38383;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background: white;
  } */
`;
const WordPage = styled(motion.div)`
  width: 70%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 15%;
  color: black;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .word-votes-container {
    top: 0;
    left: 0;
    height: 100%;
    padding: 0 0.5rem 0 1rem;
    position: absolute;
    border-right: 1px solid black;
  }
`;

export default WordDetails;
