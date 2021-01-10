import React from "react";
import { Route } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";

function WordDetails() {
  const words = useSelector((state) => state.words);

  return (
    <div>
      {words.map((word) => {
        return (
          <Route path={`/${word.word}`} key={word.word}>
            <p>{word.word}</p>
            <p>{word.def}</p>
            <p>{word.dateCreated}</p>
            <p>{word.creator}</p>
            <p>{word.wordId}</p>
          </Route>
        );
      })}
    </div>
  );
}

export default WordDetails;
