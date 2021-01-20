import React, { useState, useEffect } from "react";
// Router
import { useLocation } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Components
import Heading from "../heading/Heading";
import WordEntryForm from "../wordEntryForm/WordEntryForm";
import Wordlist from "../wordlist/Wordlist";
import WordDetails from "../wordDetails/WordDetails";
import Sidebar from "../sidebar/Sidebar";
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

  // Add scrolling when on home page and after word details
  useEffect(() => {
    if (!pathId) {
      document.body.style.overflow = "auto";
    }
  }, [pathId]);

  return (
    <HomePage className="home-page">
      <AnimateSharedLayout type="tween">
        <AnimatePresence>{pathId && <WordDetails selectedWord={selectedWord} />}</AnimatePresence>
        <Heading />
        <WordEntryForm />
        <Wordlist />
        <Sidebar />
      </AnimateSharedLayout>
    </HomePage>
  );
}

export default Home;

const HomePage = styled(motion.div)`
  display: grid;
  grid-template-areas:
    "heading heading"
    "wordEntry wordEntry"
    "wordlist sidebar"
    "wordlist sidebar"
    "wordlist sidebar";
  grid-template-rows: 5rem 1fr;
  grid-template-columns: 3fr minmax(15rem, 1fr);
  .main-header {
    grid-area: heading;
  }
  .word-entry-form {
    grid-area: wordEntry;
  }
  .wordlist {
    grid-area: wordlist;
  }
  .sidebar {
    grid-area: sidebar;
  }
  @media (max-width: 700px) {
    grid-template-areas:
      "heading "
      "wordEntry"
      "wordlist"
      "wordlist"
      "wordlist"
      "sidebar"
      "sidebar";
    grid-template-columns: 100%;
  }
`;
