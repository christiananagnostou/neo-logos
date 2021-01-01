import React, { useState } from "react";
import { Link } from "react-router-dom";

function WordEntryForm({ postWordData, currentUser, loggedIn }) {
  const [wordIdCounter, setWordIdCounter] = useState(4);
  const initialWordData = {
    word: "",
    wordId: wordIdCounter,
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
        setIsValidWord(postIsValid);
        setNewWordData({ ...initialWordData, wordId: wordIdCounter + 1 });
        setWordIdCounter((prevCounter) => (prevCounter += 1));
      } else {
        setIsValidWord(postIsValid);
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
    <form action="POST" onSubmit={handleFormSubmit} className="word-entry-form">
      <h1>Create a new Word!</h1>
      <label htmlFor="word">Add Word:</label>
      <input type="text" name="word" onChange={handleWordChange} value={newWordData.word} />
      <label htmlFor="def">Definition:</label>
      <input type="text" name="def" onChange={handleDefChange} value={newWordData.def} />
      <button type="submit" disabled={!loggedIn}>
        Submit
      </button>
      {!isValidWord && <h4>Please choose a new word. That word is already defined.</h4>}
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
    </form>
  );
}

export default WordEntryForm;
