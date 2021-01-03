import React, { useState } from "react";
import { Link } from "react-router-dom";

function WordEntryForm({ postWordData, currentUser, loggedIn, words }) {
  const initialWordData = {
    word: "",
    def: "",
    dateCreated: "",
    creator: "",
  };
  const [newWordData, setNewWordData] = useState(initialWordData);
  const [isValidWord, setIsValidWord] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newWordData.word && newWordData.def && loggedIn) {
      newWordData.creator = currentUser.name;
      newWordData.dateCreated = new Date();
      const postIsValid = await postWordData(newWordData);
      if (postIsValid) {
        setIsValidWord(true);
        setNewWordData(initialWordData);
      } else {
        setIsValidWord(false);
      }
    }
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
        <button type="submit" disabled={!loggedIn}>
          Submit
        </button>
        {!isValidWord && <h4>Please choose a new word. That word is already defined.</h4>}
      </form>
      {!loggedIn & (newWordData.word.length > 0) ? (
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
