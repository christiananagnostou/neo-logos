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
import FormContainer from "./wordEntryForm/FormContainer";

function Heading() {
  const { loggedIn } = useSelector((state) => state.user);

  return (
    <MainHeader className="main-header">
      <Logo>
        <Link to="/">
          <h1>
            <span>NEO</span>LOGOS
          </h1>
          <h6>define the future of language</h6>
        </Link>
      </Logo>
      <div className="controls-container">
        <SearchBar />
        <FormContainer />
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
  .controls-container {
    justify-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0.5rem;
    .controls-container {
      width: 100%;
      justify-content: flex-end;
    }
  }
`;

const Logo = styled(motion.div)`
  color: ${({ theme }) => theme.darkText};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: fit-content;
  h1 {
    span {
      color: ${({ theme }) => theme.gold};
    }
  }
  h6 {
    font-weight: 300;
    letter-spacing: 1px;
  }
  @media (max-width: 850px) {
    font-size: 0.6em;
    align-items: center;
    h6 {
      letter-spacing: 0px;
    }
  }
`;

export default Heading;
