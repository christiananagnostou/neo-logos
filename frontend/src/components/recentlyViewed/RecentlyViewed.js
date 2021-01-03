import React, { useState, useEffect } from "react";
import axios from "axios";

function RecentlyViewed({ visitedWordIds }) {
  useEffect(() => {
    const response = axios.get("http://localhost:4001/api/words");
  }, [visitedWordIds]);
  return (
    <div className="recently-viewed">
      <h3>RECENTLY VIEWED WORDS</h3>
      <ul>
        {visitedWordIds.map((wordId) => {
          return <li key={wordId}>{wordId}</li>;
        })}
      </ul>
    </div>
  );
}

export default RecentlyViewed;
