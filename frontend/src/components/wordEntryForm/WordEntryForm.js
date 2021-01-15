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
          />
        </div>
        <button type="submit" disabled={!user.loggedIn}>
          Post
        </button>
      </form>
      {!validWord && <h4>Please choose a new word. That word is already defined.</h4>}
      {!user.loggedIn & (newWordData.word.length > 0) ? (
        <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Please{" "}
          <Link to="/user-login" style={{ textDecoration: "underline" }}>
            Log in
          </Link>{" "}
          to submit your word.
        </motion.h4>
      ) : (
        <></>
      )}
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
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: fit-content;
    .form-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      label {
        margin: 0.25rem 0rem;
      }
      input {
        font-family: "Montserrat", sans-serif;
        font-size: 1.2rem;
        margin-right: 1rem;
        padding: 0.25rem;
        border: none;
        border-radius: 2px;

        &:focus {
          outline: none;
          box-shadow: 0 0 20px rgb(161, 161, 161);
        }
      }
      .form-word {
      }
      .form-def {
        width: 50vw;
      }
    }

    button {
      color: rgb(245, 203, 92);
      background-color: rgb(51, 53, 51);
      padding: 0.4rem 1.5rem;
      cursor: pointer;
      border-radius: 20px;
      border: none;
      font-weight: 100;
      font-size: 1.2rem;
      &:hover {
        box-shadow: 0px 3px 5px black;
        background-color: rgb(51, 53, 51);
      }
      &:focus {
        outline: none;
        box-shadow: 0 0 3px black;
      }
    }
    @media (max-width: 800px) {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      border: 1px solid red;
      width: 60%;
      .form-group {
        width: 100%;
      }
      .form-word {
        width: 100%;
      }
      .form-def {
        width: 100% !important;
      }
    }
  }
  h4 {
    width: fit-content;
    color: rgb(245, 203, 92);
  }
`;

export default WordEntryForm;
