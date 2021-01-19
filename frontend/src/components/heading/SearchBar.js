import React, { useState } from "react";
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
  const [term, setTerm] = useState("");

  const toggleSearchBar = () => {
    setSearchBarActive(!searchBarActive);
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
  width: 15rem;
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
      width: 13rem;
      border-radius: 100px;
      padding-left: 1rem;
      animation: animateSearch 0.2s forwards ease-in;

      @keyframes animateSearch {
        from {
          right: 0rem;
          opacity: 0;
        }
        to {
          right: 0.75rem;
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
      height: 2.8rem;
      width: 2.8rem;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background: ${({ theme }) => theme.medBg};
      }
    }
  }

  @media (max-width: 700px) {
    width: 5rem;
  }
`;

export default SearchBar;
