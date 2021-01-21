import React, { useState, useEffect } from "react";
// Redux
import { useDispatch } from "react-redux";
import { searchWord } from "../../redux/actions/wordsActions";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Icons
import { Search } from "@material-ui/icons";

function SearchBar() {
  const dispatch = useDispatch();

  // Local State
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [usingSearchBar, setUsingSearchBar] = useState(false);
  const [term, setTerm] = useState("");

  const toggleSearchBar = () => {
    if (!usingSearchBar) {
      setSearchBarActive(!searchBarActive);
    }
  };

  const handleSearch = (e) => {
    if (term) {
      console.log(`searching term ${term}`);
      dispatch(searchWord(term));
      setTerm("");
    } else if (!searchBarActive) {
      toggleSearchBar();
    }
  };

  const checkForEnter = (e) => {
    if (e.which === 13) {
      handleSearch();
    }
  };

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    const clickListener = (e) => {
      if (e.target.classList[0] === "search-input") {
        // user is active in search input
        setUsingSearchBar(true);
      } else {
        // close bar and cleanup
        setUsingSearchBar(false);
        setSearchBarActive(false);
      }
    };
    
    // Attach event listner
    searchBarActive && document.addEventListener("click", clickListener, true);

    return () => {
      document.removeEventListener("click", clickListener, true);
    };
  }, [searchBarActive]);

  return (
    <SearchContainer>
      <motion.div
        className="hover-container"
        onHoverStart={toggleSearchBar}
        onHoverEnd={toggleSearchBar}
      >
        {searchBarActive && (
          <input
            type="text"
            placeholder="Search a word"
            className="search-input"
            value={term}
            onChange={handleTermChange}
            onKeyDown={checkForEnter}
          />
        )}
        <Search className="search-icon" onClick={handleSearch} />
      </motion.div>
    </SearchContainer>
  );
}

const SearchContainer = styled(motion.div)`
  color: ${({ theme }) => theme.lightText};
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 1rem;
  height: 100%;

  .hover-container {
    position: relative;
    height: 2.8rem;
    .search-input {
      box-shadow: 0 0 5px ${({ theme }) => theme.shadow};
      position: absolute;
      height: 100%;
      width: 12rem;
      border-radius: 100px;
      padding-left: 1rem;
      animation: animateSearch 0.2s forwards ease-in;

      @keyframes animateSearch {
        from {
          right: -0.2rem;
          opacity: 0;
        }
        to {
          right: 0.5rem;
          opacity: 1;
        }
      }
    }

    .search-icon {
      position: relative;
      box-shadow: 0 0 5px ${({ theme }) => theme.shadow};
      background: ${({ theme }) => theme.darkBg};
      font-size: 1rem;
      padding: 10px;
      height: inherit;
      width: inherit;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background: ${({ theme }) => theme.medBg};
      }
    }
  }

  @media (max-width: 700px) {
    margin-right: 0.5rem;
    .hover-container {
      height: 2rem;
      .search-input {
        width: 10rem;
        font-size: 0.75em;
      }
      .search-icon {
        padding: 5px;
      }
    }
  }
`;

export default SearchBar;
