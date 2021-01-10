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
    wordId: null,
    def: "",
    dateCreated: "",
    creator: "",
    voteCount: 0,
  };
  const [newWordData, setNewWordData] = useState(initialWordData);
  const [validWord, setValidWord] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newWordData.word && newWordData.def && user.loggedIn) {
      setValidWord(true);
      newWordData.creator = user.name;
      newWordData.dateCreated = new Date();
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
      <h1>Create a new Word!</h1>
      <form action="POST" onSubmit={handleFormSubmit} className="word-entry-form">
        <label htmlFor="word">Word:</label>
        <input type="text" name="word" onChange={handleWordChange} value={newWordData.word} />
        <label htmlFor="def">Definition:</label>
        <input type="text" name="def" onChange={handleDefChange} value={newWordData.def} />
        <button type="submit" disabled={!user.loggedIn}>
          Submit
        </button>
      </form>
      {!validWord && <h4>Please choose a new word. That word is already defined.</h4>}
      {!user.loggedIn & (newWordData.word.length > 0) ? (
        <h4>
          Please{" "}
          <Link to="/user-login" style={{ textDecoration: "underline" }}>
            Log in
          </Link>{" "}
          to submit your word.
        </h4>
      ) : (
        <></>
      )}
    </WordEntryFormContainer>
  );
}

const WordEntryFormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .word-entry-form {
    margin: 2rem 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin: auto;
    h1 {
      margin: 1rem auto;
      width: fit-content;
    }
    label {
      font-weight: bold;
      font-size: 1.2rem;
      margin: 0 1rem;
    }
    input {
      padding: 0.5rem;
      font-size: 1.1rem;
      border: none;
      border-radius: 5px;
      box-shadow: 0 5px 10px rgb(156, 156, 156);
      &:focus {
        outline: 1px solid rgb(115, 164, 255);
      }
    }
    button {
      margin: 0 1rem;
      padding: 1rem;
      border: none;
      border-radius: 5px;
      box-shadow: 0 5px 10px rgb(156, 156, 156);
      background: rgb(226, 243, 255);
      transition: all 0.2s ease-in-out;
      &:hover {
        background: rgb(196, 227, 255);
      }
    }
    @media (max-width: 800px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  h4 {
    margin: 1rem auto;
    width: fit-content;
    color: red;
  }
`;

export default WordEntryForm;
