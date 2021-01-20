import React, { useState } from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { postNewWord } from "../../redux/actions/wordsActions";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function WordEntryForm() {
  const dispatch = useDispatch();

  // Selector
  const user = useSelector((state) => state.user);

  const initialWordData = {
    word: "",
    def: "",
    creator: "",
  };
  const [newWordData, setNewWordData] = useState(initialWordData);
  const [validWord, setValidWord] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newWordData.word && newWordData.def && user.loggedIn) {
      setValidWord(true);
      newWordData.creator = user.name;
      dispatch(postNewWord(newWordData)).catch((e) => {
        setValidWord(false);
      });
    }
    setNewWordData(initialWordData);
  };

  const handleWordChange = ({ target }) => {
    setNewWordData({ ...newWordData, word: target.value });
  };
  const handleDefChange = ({ target }) => {
    setNewWordData({ ...newWordData, def: target.value });
  };
  return (
    <WordEntryFormContainer className="word-entry-form-container">
      <form action="POST" onSubmit={handleFormSubmit} className="word-entry-form">
        <div className="form-group">
          <label htmlFor="word">
            <h3>Word:</h3>
          </label>
          <input
            type="text"
            name="word"
            className="form-word"
            onChange={handleWordChange}
            value={newWordData.word}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="def">
            <h3>Definition:</h3>
          </label>
          <input
            type="text"
            name="def"
            className="form-def"
            onChange={handleDefChange}
            value={newWordData.def}
            autoComplete="off"
          />
        </div>
        <button type="submit">Post</button>

        {!validWord && (
          <WarningText initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Please choose a new word. That word is definitely not valid.
          </WarningText>
        )}
        {!user.loggedIn & (newWordData.word.length > 0) ? (
          <WarningText initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Please{" "}
            <Link to="/user-login" style={{ textDecoration: "underline" }}>
              Log in
            </Link>{" "}
            to submit your word.
          </WarningText>
        ) : (
          <></>
        )}
      </form>
    </WordEntryFormContainer>
  );
}

const WordEntryFormContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 0.5rem 0;
  .word-entry-form {
    margin: 0 1rem;
    display: grid;
    grid-template-columns: 1fr 3fr 0.5fr minmax(17rem, 1fr);
    .form-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      label {
        color: ${({ theme }) => theme.darkText};
        margin: 0.25rem 0rem;
      }
      input {
        font-size: 1.2rem;
        margin-right: 1rem;
        &:focus {
          box-shadow: 0 0 20px rgb(161, 161, 161);
        }
      }
    }

    button {
      color: ${({ theme }) => theme.lightBg};
      background: ${({ theme }) => theme.medText};
      padding: 0.4rem 1.5rem;
      cursor: pointer;
      border-radius: 20px;
      border: none;
      font-family: "Montserrat", sans-serif;
      font-weight: 300;
      font-size: 1.2rem;
      height: min-content;
      width: 100%;
      align-self: end;
      transition: all 0.1s ease-in-out;
      &:active {
        outline: none;
        box-shadow: 0 0 3px black;
      }
      &:hover {
        box-shadow: 3px 3px 0px ${({ theme }) => theme.shadow};
        background: ${({ theme }) => theme.darkText};
        transform: translate(-1px, -1px);
      }
      &:active {
        transform: translate(1px, 1px);
        box-shadow: none;
      }
    }
    @media (max-width: 800px) {
      grid-template-columns: none;
      grid-template-rows: 5rem 1fr 1fr;
      width: 100%;
      .form-group {
        width: 100%;
      }
      .form-word {
        width: 50%;
      }
      .form-def {
        width: 100%;
      }
      button {
        width: fit-content;
        margin: auto;
      }
    }
  }
`;

const WarningText = styled(motion.h4)`
  width: fit-content;
  color: ${({ theme }) => theme.medText};
  text-align: center;
`;

export default WordEntryForm;
