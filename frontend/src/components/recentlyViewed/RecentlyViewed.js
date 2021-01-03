import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RecentlyViewed({ visitedWordIds }) {
  const [visitedWords, setVisitedWords] = useState({});

  const getWordInfoFromIds = async () => {
    const response = axios.post("http://localhost:4001/api/words", {
      visitedWordIds,
      type: "get-recently-viewed",
    });
    try {
      const res = await response;
      setVisitedWords(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    getWordInfoFromIds();
  }, [visitedWordIds]);

  return (
    <div className="recently-viewed">
      <h3>RECENTLY VIEWED WORDS</h3>
      {visitedWords.length > 0 && (
        <ul>
          {visitedWords.map((word) => {
            return (
              <Link to={`/${word.word}`} key={word.word}>
                <li>
                  <p>{word.word}</p>
                  <p>{word.def}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default RecentlyViewed;
