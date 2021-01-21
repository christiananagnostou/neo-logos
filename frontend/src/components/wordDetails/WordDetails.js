import React from "react";
// Router
import { useHistory } from "react-router-dom";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Utils
import { timeConverter, capitalizeFirstLetter } from "../../utils/utils";

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
          <WordPage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={selectedWord._id}
          >
            <div className="details">
              <p className="word-word">{capitalizeFirstLetter(selectedWord.word)}</p>
              <p className="word-def">{selectedWord.def}</p>
              <p className="word-date">
                created: <span>{timeConverter(selectedWord.dateCreated)}</span>
              </p>
              <p className="word-creator">
                author: <span>{selectedWord.creator}</span>
              </p>
              <p className="word-id">ID: {selectedWord._id}</p>
            </div>
          </WordPage>
        </CardShadow>
      )}
    </>
  );
}

const CardShadow = styled(motion.div)`
  z-index: 999;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
`;
const WordPage = styled(motion.div)`
  background: ${({ theme }) => theme.lightBg};
  color: ${({ theme }) => theme.darkText};
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 40vw;
  padding: 1rem;
  .details {
    width: 100%;
    display: flex;
    flex-direction: column;
    & > p {
      padding-bottom: 0.5rem;
      font-size: 0.75rem;
      font-weight: 300;
      span {
        font-size: 0.9rem;
      }
    }
    .word-word {
      color: ${({ theme }) => theme.gold};
      border-bottom: 1px solid ${({ theme }) => theme.darkBg};
      font-size: 1.75rem;
      font-weight: 600;
      width: fit-content;
      padding-bottom: 0.25rem;
      margin-bottom: 0.25rem;
    }
    .word-def {
      padding-bottom: 2rem;
      font-size: 1rem;
      font-weight: 400;
    }
    .word-date {
    }
    .word-creator {
    }
    .word-id {
      font-size: 0.5rem;
      font-weight: 100;
    }
  }
  @media (max-width: 700px) {
    width: 80vw;
  }
`;

export default WordDetails;
