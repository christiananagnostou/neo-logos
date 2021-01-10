import React, { useState, useEffect } from "react";
// Router
import { useLocation } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Components
import Heading from "../heading/Heading";
import RecentlyViewed from "../recentlyViewed/RecentlyViewed";
import TopWords from "../topWords/TopWords";
import WordEntryForm from "../wordEntryForm/WordEntryForm";
import Wordlist from "../wordlist/Wordlist";
import WordDetails from "../wordDetails/WordDetails";
// Styling and Animation
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";

function Home() {
  // Router
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  // Redux
  const words = useSelector((state) => state.words);
  // State
  const [selectedWord, setSelectedWord] = useState(null);
  useEffect(() => {
    setSelectedWord(words.find((word) => word.word === pathId));
  }, [pathId, words]);

  // Add scrolling when on home page
  useEffect(() => {
    if (!pathId) {
      document.body.style.overflow = "auto";
    }
  });
  return (
    <div className="home-page">
      <AnimateSharedLayout type="tween">
        <AnimatePresence>{pathId && <WordDetails selectedWord={selectedWord} />}</AnimatePresence>
        <Heading />
        <WordEntryForm />
        <Wordlist />
        <TopWords />
        <RecentlyViewed />
      </AnimateSharedLayout>
    </div>
  );
}

export default Home;
