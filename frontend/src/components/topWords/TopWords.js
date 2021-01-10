import React, { useState, useEffect } from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";

function TopWords() {
  // Redux
  const words = useSelector((state) => state.words);
  const [topFiveWords, setTopFiveWords] = useState([]);

  useEffect(() => {
    setTopFiveWords([...words].sort((a, b) => b.voteCount - a.voteCount).slice(0, 3));
  }, [words]);

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
