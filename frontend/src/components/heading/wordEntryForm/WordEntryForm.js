import React, { useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { postNewWord } from "../../../redux/actions/wordsActions";
// Router
import { useHistory } from "react-router-dom";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { wordFormAnim } from "../../../animation";

function WordEntryForm() {
  // Router
  let history = useHistory();
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const initialWordData = {
    word: "",
    partOfSpeech: "",
    def: "",
    example: "",
    creator: "",
  };
  const [newWordData, setNewWordData] = useState(initialWordData);
  // const [validWord, setValidWord] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user.loggedIn) {
      // setValidWord(true);
      // Set word to lower case and add user name
      newWordData.word = newWordData.word.toLowerCase();
      newWordData.creator = user.name;
      // Try posting the new word
      dispatch(postNewWord(newWordData)).catch((e) => {
        // setValidWord(false);
      });

      setNewWordData(initialWordData);
    } else {
      setNewWordData(initialWordData);
      history.push("/login");
    }
  };

  // Input handlers
  const handleWordChange = ({ target }) => {
    setNewWordData({ ...newWordData, word: target.value });
  };
  const handlePartOfSpeechChange = ({ target }) => {
    console.log(target.value);
    setNewWordData({ ...newWordData, partOfSpeech: target.value });
  };
  const handleDefChange = ({ target }) => {
    setNewWordData({ ...newWordData, def: target.value });
  };
  const handleExampleChange = ({ target }) => {
    setNewWordData({ ...newWordData, example: target.value });
  };

  return (
    <WordForm
      action="POST"
      onSubmit={handleFormSubmit}
      variants={wordFormAnim}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <FormGroup className="form-word">
        <label htmlFor="word">
          <h3>Word:</h3>
        </label>
        <input
          type="text"
          name="word"
          onChange={handleWordChange}
          value={newWordData.word}
          autoComplete="off"
          required
        />
      </FormGroup>
      <FormGroup className="form-select">
        <label htmlFor="partOfSpeech">
          <h3>Part of speech:</h3>
        </label>
        <select
          name="partOfSpeech"
          className="form-select"
          onChange={handlePartOfSpeechChange}
          value={newWordData.partOfSpeech}
        >
          <option>select one</option>
          <option value="noun">Noun</option>
          <option value="verb">Verb</option>
          <option value="adverb">Adverb</option>
          <option value="pronoun">Pronoun</option>
          <option value="adjective">Adjective</option>
          <option value="preposition">Preposition</option>
          <option value="conjunction">Conjunction</option>
          <option value="interjection">Interjection</option>
        </select>
      </FormGroup>
      <FormGroup className="form-def">
        <label htmlFor="def">
          <h3>Definition:</h3>
        </label>
        <input
          type="text"
          name="def"
          onChange={handleDefChange}
          value={newWordData.def}
          autoComplete="off"
          required
        />
      </FormGroup>

      <FormGroup className="form-example">
        <label htmlFor="example">
          <h3>Example sentence:</h3>
        </label>
        <input
          type="text"
          name="example"
          onChange={handleExampleChange}
          value={newWordData.example}
          autoComplete="off"
        />
      </FormGroup>

      <PostBtn type="submit" className="post-btn">
        Post
      </PostBtn>
    </WordForm>
  );
}

const WordForm = styled(motion.form)`
  background: ${({ theme }) => theme.medBg};
  border-radius: 5px 5px 0 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 1rem 0.5rem 20vh;
  width: 80vw;
  display: grid;
  grid-template-areas:
    "word pos def"
    "ex ex ex"
    "btn . .";
  grid-template-columns: 1fr minmax(11rem, 1fr) 4fr;
  grid-template-rows: 1fr 1fr 0.75fr;

  .form-word {
    grid-area: word;
    padding-right: 1rem;
  }
  .form-select {
    grid-area: pos;
  }
  .form-def {
    grid-area: def;
    padding-left: 1rem;
  }
  .form-example {
    grid-area: ex;
  }

  @media (max-width: 820px) {
    padding: 1rem 0.25rem 4rem;
    width: 100vw;
    grid-template-areas:
      "word pos"
      "def def"
      "ex ex "
      "btn . ";
    grid-template-columns: 2fr minmax(8rem, 1fr);
    grid-template-rows: 1fr 1fr 1fr 0.5fr;
    .form-def {
      padding-left: 0;
    }
  }
`;

const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

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
  select {
    font-size: 1.2rem;
    font-family: "Montserrat", sans-serif;
    padding: 0.18rem;
    border: none;
    border-radius: 2px;
    &:focus {
      box-shadow: 0 0 20px ${({ theme }) => theme.shadow};
      outline: none;
    }
  }
  @media (max-width: 700px) {
    label {
      h3 {
        font-size: 1em;
      }
    }
  }
`;

const PostBtn = styled(motion.button)`
  grid-area: btn;
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

  @media (max-width: 700px) {
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
`;

export default WordEntryForm;
