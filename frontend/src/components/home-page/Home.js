import React from "react";
// Components
import Heading from "../heading/Heading";
import RecentlyViewed from "../recentlyViewed/RecentlyViewed";
import WordEntryForm from "../wordEntryForm/WordEntryForm";
import Wordlist from "../wordlist/Wordlist";

function Home({ currentUser, loggedIn, postWordData, words, handleAddViewedWord, visitedWordIds }) {
  return (
    <div className="home-page">
      <Heading currentUser={currentUser} loggedIn={loggedIn} />
      <WordEntryForm
        postWordData={postWordData}
        currentUser={currentUser}
        loggedIn={loggedIn}
        words={words}
      />
      <Wordlist words={words} handleAddViewedWord={handleAddViewedWord} />
      <RecentlyViewed visitedWordIds={visitedWordIds} />
    </div>
  );
}

export default Home;
