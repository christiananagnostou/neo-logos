import React from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";

function RecentlyViewed() {
  const { recentlyViewedWords } = useSelector((state) => state.user);

  return (
    <div className="recently-viewed">
      <h3>RECENTLY VIEWED</h3>
      <ul>
        {recentlyViewedWords.map((word) => {
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
    </div>
  );
}

export default RecentlyViewed;
