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
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
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
    <HomePage className="home-page">
      <AnimateSharedLayout type="tween">
        <AnimatePresence>{pathId && <WordDetails selectedWord={selectedWord} />}</AnimatePresence>
        <Heading />
        <WordEntryForm />
        <Wordlist />
        <TopWords />
        <RecentlyViewed />
      </AnimateSharedLayout>
    </HomePage>
  );
}

export default Home;

const HomePage = styled(motion.div)`
  display: grid;
  grid-template-areas:
    "header header"
    "wordEntry wordEntry"
    "wordlist topWords"
    "wordlist recentView"
    "wordlist e";
  grid-template-rows: 5rem 10rem 1fr 15rem 1fr;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  .main-header {
    grid-area: header;
  }
  .word-entry-form-container {
    grid-area: wordEntry;
  }
  .wordlist {
    grid-area: wordlist;
    height: fit-content;
  }
  .recently-viewed {
    grid-area: recentView;
  }
  .top-words {
    grid-area: topWords;
  }
`;
