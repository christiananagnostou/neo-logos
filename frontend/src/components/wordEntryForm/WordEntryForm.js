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
    <WordEntryFormStyles className="word-entry-form">
      <form action="POST" onSubmit={handleFormSubmit} className="word-entry-form">
        <div className="form-group form-word">
          <label htmlFor="word">
            <h3>Word:</h3>
          </label>
          <input
            type="text"
            name="word"
            onChange={handleWordChange}
            value={newWordData.word}
            autoComplete="off"
          />
        </div>
        <div className="form-group form-def">
          <label htmlFor="def">
            <h3>Definition:</h3>
          </label>
          <input
            type="text"
            name="def"
            onChange={handleDefChange}
            value={newWordData.def}
            autoComplete="off"
          />
        </div>
        <button type="submit" className="post-btn">
          Post
        </button>

        {!validWord && (
          <WarningText initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Please choose a new word. That word is already defined.
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
    </WordEntryFormStyles>
  );
}

const WordEntryFormStyles = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 0.5rem 1rem;
  .word-entry-form {
    width: 100%;
    display: grid;
    grid-template-columns: 20vw 1fr;
    .form-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-right: 1rem;

      label {
        color: ${({ theme }) => theme.darkText};
        margin: 0.25rem 0rem;
        width: fit-content;
      }
      input {
        font-size: 1.2rem;
        &:focus {
          box-shadow: 0 0 20px ${({ theme }) => theme.shadow};
        }
      }
    }

    .post-btn {
      width: fit-content;
      color: ${({ theme }) => theme.lightBg};
      background: ${({ theme }) => theme.medText};
      padding: 0.4rem 1.5rem;
      margin-top: 0.5rem;
      cursor: pointer;
      border-radius: 10px;
      border: none;
      font-family: "Montserrat", sans-serif;
      font-weight: 300;
      font-size: 1.2rem;
      align-self: end;
      transition: all 0.1s ease-in-out;
      outline: none;
      &:hover {
        box-shadow: -2px 2px 1px ${({ theme }) => theme.shadow};
        background: ${({ theme }) => theme.darkText};
        transform: translate(1px, -1px);
      }
      &:active {
        transform: translate(-1px, 1px);
        box-shadow: none;
      }
    }
  }
  @media (max-width: 700px) {
    padding: 0.5rem;
    .word-entry-form {
      grid-template-columns: 1fr;
      .form-group {
        padding: 0;
        label {
          h3 {
            font-size: 1em;
          }
        }
      }
      .form-word {
        width: 50%;
      }
      .post-btn {
        font-size: 1em;
        &:hover {
          background: ${({ theme }) => theme.medText};
          box-shadow: none;
          transform: none;
        }
        &:active {
          background: ${({ theme }) => theme.darkText};
          transform: scale(0.95);
        }
      }
    }
  }
`;

const WarningText = styled(motion.h4)`
  width: fit-content;
  position: absolute;
  right: 10px;
  top: 2px;
  color: ${({ theme }) => theme.medText};
  text-align: center;
`;

export default WordEntryForm;
