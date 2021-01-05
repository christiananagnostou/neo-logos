import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TopWords() {
  const [topFiveWords, setTopFiveWords] = useState([]);

  const getTopFiveWords = async () => {
    const response = axios.get("http://localhost:4001/api/words/top-five");
    try {
      const res = await response;
      console.log(res);
      setTopFiveWords(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTopFiveWords();
  }, []);

  return (
    <div className="top-words">
      <h3>TOP WORDS</h3>
      <ul>
        {topFiveWords.map((word) => {
          return (
            <Link to={`/${word.word}`} key={word.word}>
              <li>
                <p>
                  {word.word}
                  <span>{word.voteCount}</span>
                </p>
                <p>{word.def}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default TopWords;
