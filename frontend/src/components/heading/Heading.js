import React from "react";
// Router
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Components
import AccountInfo from "./AccountInfo";
import LoginTabs from "./LoginTabs";
import SearchBar from "./SearchBar";

function Heading() {
  const { loggedIn } = useSelector((state) => state.user);

  return (
    <MainHeader className="main-header">
      <Link to="/">
        <Logo>
          <h1>
            <span>NEO</span>LOGOS
          </h1>
          <h6>define the future of language</h6>
        </Logo>
      </Link>
      <div className="right-side-container">
        <SearchBar />

        {loggedIn ? <AccountInfo /> : <LoginTabs />}
      </div>
    </MainHeader>
  );
}

const MainHeader = styled(motion.div)`
  background: ${({ theme }) => theme.lightBg};
  width: 100%;
  height: 5rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 1rem 3rem;
  position: relative;
  .right-side-container {
    justify-self: flex-end;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0.5rem;
    .right-side-container {
      flex-direction: row;
      align-self: flex-end;
    }
  }
`;

const Logo = styled(motion.div)`
  color: ${({ theme }) => theme.darkText};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h1 {
    span {
      color: ${({ theme }) => theme.gold};
    }
  }
  h6 {
    font-weight: 300;
    letter-spacing: 1px;
  }
  @media (max-width: 700px) {
    font-size: 0.6em;
    align-items: center;
    h6 {
      letter-spacing: 0px;
    }
  }
`;

export default Heading;
