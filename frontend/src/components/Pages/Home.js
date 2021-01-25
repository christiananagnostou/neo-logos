import React, { useState, useEffect } from "react";
// Axios
import axios from "axios";
// Router
import { useLocation } from "react-router-dom";
// Components
import Heading from "../heading/Heading";
import Wordlist from "../wordlist/Wordlist";
import WordDetails from "../wordDetails/WordDetails";
import Sidebar from "../sidebar/Sidebar";
// Styles and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

function Home() {
  // Router
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  // State
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    const fetchWordDetails = async () => {
      const clickedWord = await axios.get(`/api/words/${pathId}`);
      setSelectedWord(clickedWord.data);
    };

    if (pathId) {
      // Fetch word details for wordDetails if user clicks on a word
      fetchWordDetails();
    } else {
      // Add scrolling when on home page and after word details
      document.body.style.overflow = "auto";
    }
  }, [pathId]);

  return (
    <HomePage className="home-page">
      <AnimateSharedLayout>
        <AnimatePresence>{pathId && <WordDetails selectedWord={selectedWord} />}</AnimatePresence>
        <Heading />
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
    "wordlist sidebar"
    "wordlist sidebar"
    "wordlist sidebar";
  grid-template-rows: 5rem 1fr;
  grid-template-columns: 3fr minmax(15rem, 1fr);
  .main-header {
    grid-area: heading;
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
      "wordlist"
      "wordlist"
      "wordlist"
      "sidebar"
      "sidebar";
    grid-template-columns: 100%;
  }
`;
