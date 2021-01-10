import React, { useState } from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { postNewWord } from "../../redux/actions/wordsActions";

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
    <div className="word-entry-form-container">
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
    </div>
  );
}

export default WordEntryForm;
