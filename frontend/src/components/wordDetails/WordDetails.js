import React from "react";
import { Route } from "react-router-dom";

function WordDetails({ words }) {
  return (
    <div>
      {words.map((word) => {
        return (
          <Route path={`/${word.wordId}`} key={word.wordId}>
            <p>{word.word}</p>
            <p>{word.def}</p>
            <p>{word.dateCreated}</p>
            <p>{word.creator}</p>
          </Route>
        );
      })}
    </div>
  );
}

export default WordDetails;
