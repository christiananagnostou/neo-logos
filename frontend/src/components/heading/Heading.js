import React from "react";
// Redux
import { useSelector } from "react-redux";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Components
import AccountInfo from "./AccountInfo";
import LoginTabs from "./LoginTabs";

function Heading() {
  const { loggedIn } = useSelector((state) => state.user);

  return (
    <MainHeader className="main-header">
      <Logo>
        <h1>DICT-IT</h1>
        <h6>REDDIT DICTIONARY </h6>
      </Logo>
      {loggedIn ? <AccountInfo /> : <LoginTabs />}
    </MainHeader>
  );
}

const MainHeader = styled(motion.div)`
  background: ${({ theme }) => theme.lightBg};
  width: 100%;
  height: 5rem;
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: center;
  padding: 1rem;
  @media (max-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    height: 9rem;
  }
`;

const Logo = styled(motion.div)`
  color: ${({ theme }) => theme.darkText};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h6 {
    font-weight: 300;
    letter-spacing: 1px;
  }
`;

export default Heading;
