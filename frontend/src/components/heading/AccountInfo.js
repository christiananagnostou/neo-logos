import React, { useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleNightMode } from "../../redux/actions/userActions";
// Components
import SearchBar from "./SearchBar";
// Utils
import { timeConverter } from "../../utils/utils";
// Icons
import { AccountBox, ArrowDropDown } from "@material-ui/icons";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function AccountInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [displayAccountInfo, setDisplayAccountInfo] = useState(false);

  // Display info on click
  const handleIconClick = (e) => {
    setDisplayAccountInfo((prev) => !prev);
  };
  // Toggle Night Mode
  const toggleMode = () => {
    dispatch(toggleNightMode());
  };

  return (
    <AccountInfoContainer>
      <div className="hide-container">
        <SearchBar />

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
        <h6>My stuff:</h6>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>Member since: {timeConverter(user.accountCreated)}</p>
        <h6>Options:</h6>
        <div className="nightmode-toggle">
          <p>Night Mode</p>
          <label className="switch" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" onClick={toggleMode} />
            <div className="slider round"></div>
          </label>
        </div>
      </div>
    </AccountInfoContainer>
  );
}

const AccountInfoContainer = styled(motion.div)`
  color: ${({ theme }) => theme.lightText};
  justify-self: end;
  position: relative;
  height: 100%;
  .hide-container {
    background: ${({ theme }) => theme.lightBg};
    height: 100%;
    position: relative;
    z-index: 999;
    display: flex;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .account-icon-container {
    background: ${({ theme }) => theme.darkBg};
    box-shadow: 0 0 5px ${({ theme }) => theme.shadow};
    float: right;
    height: 2.8rem;
    width: fit-content;
    margin-right: 3rem;
    padding-right: 0.75rem;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    .account-box-icon {
      font-size: 2.5rem;
    }
    .account-arrow-icon {
      font-size: 2rem;
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
    top: 97%;
    z-index: 555;
  }
  .account-info {
    background: ${({ theme }) => theme.darkBg};
    color: ${({ theme }) => theme.darkText};
    box-shadow: 0 3px 3px ${({ theme }) => theme.shadow};
    border-radius: 3px;
    width: fit-content;
    position: absolute;
    right: 3rem;
    padding: 0.5rem;
    transition: all 0.2s ease;
    p {
      margin: 0.5rem 0;
      font-weight: 300;
      display: flex;
      justify-content: flex-start;
      align-content: center;
    }

    .nightmode-toggle {
      display: flex;
      align-items: center;
      .switch {
        margin-left: 10px;
        display: inline-block;
        height: 20px;
        position: relative;
        width: 30px;
      }

      .switch input {
        display: none;
      }

      .slider {
        background-color: #ccc;
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: 0.4s;
      }

      .slider:before {
        background-color: white;
        bottom: 2px;
        left: 2px;
        content: "";
        height: 16px;
        width: 16px;
        position: absolute;
        transition: 0.4s;
      }

      input:checked + .slider {
        background-color: rgb(51, 53, 51);
      }

      input:checked + .slider:before {
        transform: translateX(10px);
      }

      .slider.round {
        border-radius: 34px;
      }

      .slider.round:before {
        border-radius: 50%;
      }
    }
  }
`;

export default AccountInfo;
