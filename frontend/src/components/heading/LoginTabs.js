import React from "react";
// Router
import { Link } from "react-router-dom";
// Components
import SearchBar from "./SearchBar";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function LoginTabs() {
  return (
    <Tabs>
      <SearchBar />

      <Link to="/user-login">
        <div className="account-btn">Login</div>
      </Link>
      <Link to="/create-account">
        <div className="account-btn">Create Account</div>
      </Link>
    </Tabs>
  );
}

const Tabs = styled(motion.div)`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  .account-btn {
    background: ${({ theme }) => theme.darkBg};
    box-shadow: 0 0 5px ${({ theme }) => theme.shadow};
    color: ${({ theme }) => theme.lightText};
    border-radius: 3px;
    border: none;
    padding: 1rem;
    margin: 0 0.25rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: ${({ theme }) => theme.medBg};
      color: black;
      font-weight: 400;
    }
  }
`;

export default LoginTabs;
