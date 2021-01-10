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
        <h1>Phantomnation</h1>
      </div>
      {user.loggedIn ? (
        <div className="account-info-container">
          <div className="account-icon-container" onClick={handleIconClick}>
            <ArrowDropDown
              className={
                displayAccountInfo ? "account-arrow-icon rotated-arrow" : "account-arrow-icon"
              }
            />
            <AccountBox className="account-box-icon" />
            <p>{user.name}</p>
          </div>

          <div className={displayAccountInfo ? "account-info show" : "account-info hidden"}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>
              Member since: <br />
              {user.accountCreated}
            </p>
          </div>
        </div>
      ) : (
        <div className="tabs">
          <Link to="/user-login">
            <div className="account-btn">Login</div>
          </Link>
          <Link to="/create-account">
            <div className="account-btn">Create Account</div>
          </Link>
        </div>
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
    color: rgb(54, 54, 54);
  }
  .account-info-container {
    position: relative;
    height: 100%;
    .account-icon-container {
      user-select: none;
      z-index: 555;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 3rem;
      background: rgb(214, 235, 255);
      padding-right: 0.75rem;
      width: 15rem;
      .account-box-icon {
        font-size: 2.5rem;
        color: rgb(100, 100, 100);
      }
      .account-arrow-icon {
        font-size: 2rem;
        color: rgb(100, 100, 100);
        transition: all 0.2s ease-in-out;
      }
      .rotated-arrow {
        transform: rotateZ(-180deg);
      }
      p {
        font-size: 1.1rem;
        font-weight: 100;
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
      border-top: 1px solid grey;
      border-radius: 0 0 5px 5px;
      width: 15rem;
      background: rgb(214, 235, 255);
      position: absolute;
      right: 3rem;
      padding: 0.5rem;
      transition: all 0.2s ease;
      p {
        margin: 0.5rem 0;
      }
    }
  }
  .tabs {
    justify-self: end;
    display: flex;
    .account-btn {
      box-shadow: 0 5px 10px rgb(156, 156, 156);
      border-radius: 5px;
      border: none;
      padding: 1rem;
      margin: 0 0.25rem;
      text-align: center;
      background: rgb(226, 243, 255);
      cursor: pointer;
      &:hover {
        background: rgb(196, 227, 255);
      }
      &:focus {
        outline: 1px solid rgb(115, 164, 255);
      }
    }
  }
`;

export default Heading;
