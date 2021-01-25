import React, { useState } from "react";
// Styles and Animation
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { wordFormAnim } from "../../../animation";
// Components
import WordEntryForm from "./WordEntryForm";
// Icons
import { Add } from "@material-ui/icons";

function FormContainer() {
  const [displayForm, setDisplayForm] = useState(false);

  const handleToggleForm = () => {
    setDisplayForm((prev) => !prev);
  };

  const handleShadowClick = (e) => {
    if (e.target.className === "shadow") {
      handleToggleForm();
    }
  };

  return (
    <WordEntryFormContainer className="word-entry-container">
      <Add onClick={handleToggleForm} className="add-icon" />

      <AnimatePresence>
        {displayForm && (
          <motion.div
            variants={wordFormAnim}
            initial="hidden"
            animate="show"
            exit="exit"
            className="shadow"
            onClick={handleShadowClick}
          >
            <WordEntryForm />
          </motion.div>
        )}
      </AnimatePresence>
    </WordEntryFormContainer>
  );
}

const WordEntryFormContainer = styled(motion.div)`
  margin-right: 1rem;
  height: 100%;
  color: ${({ theme }) => theme.lightText};
  display: flex;
  align-items: center;
  .add-icon {
    position: relative;
    box-shadow: 0 0 3px ${({ theme }) => theme.shadow};
    background: ${({ theme }) => theme.darkBg};
    font-size: 1rem;
    padding: 10px;
    height: 2.8rem;
    width: inherit;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.medBg};
    }
  }

  .shadow {
    position: fixed;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
  @media (max-width: 700px) {
    height: 2rem;
    .add-icon {
      height: inherit;
      padding: 5px;
    }
  }
`;

export default FormContainer;
