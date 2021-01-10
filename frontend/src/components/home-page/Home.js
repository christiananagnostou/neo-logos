import React from "react";
// Components
import Heading from "../heading/Heading";
import RecentlyViewed from "../recentlyViewed/RecentlyViewed";
import TopWords from "../topWords/TopWords";
import WordEntryForm from "../wordEntryForm/WordEntryForm";
import Wordlist from "../wordlist/Wordlist";

function Home() {
  return (
    <div className="home-page">
      <Heading />
      <WordEntryForm />
      <Wordlist />
      <TopWords />
      <RecentlyViewed />
    </div>
  );
}

export default Home;
