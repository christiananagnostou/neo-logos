import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [idCounter, setIdCounter] = useState(5);
  const initialWordData = {
    word: "",
    wordId: idCounter,
    def: "",
  };
  const [words, setWords] = useState([]);
  const [newWordData, setNewWordData] = useState(initialWordData);

  const fetchWordData = async () => {
    console.log("fetching new data");
    await axios.get("http://localhost:4001/api/words").then((res) => {
      setWords(res.data);
    });
  };
  const postWordData = async () => {
    console.log("posting new data");
    await axios.post("http://localhost:4001/api/words", {
      newWordData,
    });
  };

  useEffect(() => {
    fetchWordData();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    postWordData();
    setIdCounter((prevCounter) => (prevCounter += 1));
    setNewWordData(initialWordData, fetchWordData());
  };

  const handleWordChange = ({ target }) => {
    setNewWordData({ ...newWordData, word: target.value });
  };
  const handleDefChange = ({ target }) => {
    setNewWordData({ ...newWordData, def: target.value });
  };

  return (
    <div className="App">
      <form action="POST" onSubmit={handleForm}>
        <h1>Create a new Word!</h1>
        <label htmlFor="word">New Word:</label>
        <input type="text" name="word" onChange={handleWordChange} value={newWordData.word} />
        <label htmlFor="def">Definition:</label>
        <input type="text" name="def" onChange={handleDefChange} value={newWordData.def} />
        <button type="submit">Submit</button>
      </form>
      <ul className="words">
        {words.map((word) => {
          return (
            <li key={word.wordId}>
              {word.word} - {word.def}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
