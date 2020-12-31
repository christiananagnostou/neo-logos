import React from "react";

function WordEntryForm({ setNewWordData, newWordData, postWordData }) {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newWordData.word && newWordData.def) {
      await postWordData();
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
      <label htmlFor="word">New Word:</label>
      <input type="text" name="word" onChange={handleWordChange} value={newWordData.word} />
      <label htmlFor="def">Definition:</label>
      <input type="text" name="def" onChange={handleDefChange} value={newWordData.def} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default WordEntryForm;
