import React, { useState } from "react";
// Redux
import { useDispatch } from "react-redux";
import { deleteWord } from "../../redux/actions/wordsActions";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { Delete, Check, Clear } from "@material-ui/icons/";

function DeleteWord({ word }) {
  const dispatch = useDispatch();

  const [showVerify, setShowVerify] = useState(false);

  const handleDeleteWord = (wordId) => {
    dispatch(deleteWord(wordId));
  };

  return (
    <DeleteWordContainer>
      <Delete onClick={() => setShowVerify(true)} />
      {showVerify && (
        <VerifyDelete>
          <p>Delete word?</p>
          <Check className="icon" onClick={() => handleDeleteWord(word._id)} />
          <Clear className="icon" onClick={() => setShowVerify(false)} />
        </VerifyDelete>
      )}
    </DeleteWordContainer>
  );
}

const DeleteWordContainer = styled(motion.div)`
  color: ${({ theme }) => theme.medBg};
  position: absolute;
  bottom: 5%;
  right: 0.5%;
  display: grid;
  place-items: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.lightText};
  }
`;

const VerifyDelete = styled(motion.div)`
  background: ${({ theme }) => theme.lightText};
  color: ${({ theme }) => theme.lightBg};
  position: absolute;
  width: max-content;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0.1rem 0.2rem;
  border-radius: 3px;
  z-index: 2;
  cursor: default;
  p {
    font-weight: 100;
    margin-right: 5px;
  }
  .icon {
    &:hover {
      color: ${({ theme }) => theme.gold};
      cursor: pointer;
    }
  }

  animation: animateDelete 0.1s forwards ease-in;
  @keyframes animateDelete {
    from {
      opacity: 0;
      right: -5rem;
    }
    to {
      opacity: 1;
      right: 0;
    }
  }
`;

export default DeleteWord;
