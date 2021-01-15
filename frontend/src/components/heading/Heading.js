import React, { useState } from "react";
// Router
import { Link } from "react-router-dom";
// Icons
import { AccountBox, ArrowDropDown } from "@material-ui/icons";
// Redux
import { useSelector } from "react-redux";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Utils
import { timeConverter } from "../../utils/utils";

function Heading() {
  const user = useSelector((state) => state.user);

  const [displayAccountInfo, setDisplayAccountInfo] = useState(false);

  // Display info on click
  const handleIconClick = () => {
    setDisplayAccountInfo((prev) => !prev);
  };

  return (
    <MainHeader className="main-header">
      <div className="logo">
        <h1>DICT-IT</h1>
        <h6>REDDIT DICTIONARY </h6>
      </div>
      {user.loggedIn ? (
        <AccountInfoContainer>
          <div className="hide-container">
            <div className="account-icon-container" onClick={handleIconClick}>
              <ArrowDropDown
                className={
                  displayAccountInfo ? "account-arrow-icon rotated-arrow" : "account-arrow-icon"
                }
              />
              <AccountBox className="account-box-icon" />
            </div>
          </div>
          <div className={displayAccountInfo ? "account-info show" : "account-info hidden"}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>
              Member since: <br />
              {timeConverter(user.accountCreated)}
            </p>
          </div>
        </AccountInfoContainer>
      ) : (
        <Tabs>
          <Link to="/user-login">
            <div className="account-btn">Login</div>
          </Link>
          <Link to="/create-account">
            <div className="account-btn">Create Account</div>
          </Link>
        </Tabs>
      )}
    </MainHeader>
  );
}

const MainHeader = styled(motion.div)`
  width: 100%;
  height: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background: white;
  padding: 1rem;
  .logo {
    color: rgb(245, 203, 92);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    h6 {
      font-weight: 100;
    }
  }
`;

const Tabs = styled(motion.div)`
  justify-self: end;
  display: flex;
  .account-btn {
    box-shadow: 0 5px 10px rgb(0, 0, 0);
    border-radius: 5px;
    border: none;
    padding: 1rem;
    margin: 0 0.25rem;
    text-align: center;
    background-color: rgb(36, 36, 35);
    color: white;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: rgb(245, 203, 92);
      color: black;
    }
  }
`;

const AccountInfoContainer = styled(motion.div)`
  position: relative;
  height: 100%;
  color: rgb(36, 36, 35);
  .hide-container {
    height: 100%;
    overflow: hidden;
    background-color: rgb(51, 53, 51);
    position: relative;
    z-index: 555;
  }
  .account-icon-container {
    float: right;
    margin-right: 3rem;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;
    background-color: rgb(207, 219, 213);
    padding-right: 0.75rem;
    width: fit-content;
    .account-box-icon {
      font-size: 2.5rem;
      color: rgb(36, 36, 35);
    }
    .account-arrow-icon {
      font-size: 2rem;
      color: rgb(36, 36, 35);
      transition: all 0.2s ease-in-out;
    }
    .rotated-arrow {
      transform: rotateZ(-180deg);
    }
  }
  .hidden {
    opacity: 0;
    top: 0%;
  }
  .show {
    opacity: 1;
    top: 100%;
  }
  .account-info {
    border-radius: 3px 0 3px 3px;
    width: fit-content;
    background-color: rgb(207, 219, 213);
    position: absolute;
    right: 3rem;
    padding: 0.5rem;
    transition: all 0.2s ease;
    p {
      margin: 0.5rem 0;
      font-weight: 300;
    }
  }
`;

export default Heading;
