import React, { useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleNightMode } from "../../redux/actions/userActions";
// Utils
import { timeConverter } from "../../utils/utils";
// Icons
import { AccountBox, ArrowDropDown } from "@material-ui/icons";
// Styles and Animation
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { accInfoAnim, fade } from "../../animation";

function AccountInfo() {
  //Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // Local State
  const [displayAccountInfo, setDisplayAccountInfo] = useState(false);

  // Display info on click
  const toggleInfoDisplay = (e) => {
    setDisplayAccountInfo((prev) => !prev);
  };

  // Toggle Night Mode
  const toggleMode = (e) => {
    dispatch(toggleNightMode());
  };

  const handleShadowClick = (e) => {
    if (e.target.classList.value.includes("dropdown-shadow")) {
      setDisplayAccountInfo(false);
    }
  };

  return (
    <AccountInfoContainer>
      <div className="icon-container" onClick={toggleInfoDisplay}>
        <ArrowDropDown className={displayAccountInfo ? "arrow-icon rotated-arrow" : "arrow-icon"} />
        <AccountBox className="box-icon" />
      </div>
      <AnimatePresence>
        {displayAccountInfo && (
          <DropdownShadow
            className="dropdown-shadow"
            variants={fade}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={handleShadowClick}
          >
            <AccountInfoDropdown
              className="account-info"
              variants={accInfoAnim}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <h6>My stuff:</h6>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>Member since: {timeConverter(user.accountCreated)}</p>
              <h6>Options:</h6>
              <div className="nightmode-toggle">
                <p>Night Mode</p>
                <label className="switch" htmlFor="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={toggleMode}
                    checked={user.nightMode}
                  />
                  <div className="slider round"></div>
                </label>
              </div>
            </AccountInfoDropdown>
          </DropdownShadow>
        )}
      </AnimatePresence>
    </AccountInfoContainer>
  );
}

const AccountInfoContainer = styled(motion.div)`
  color: ${({ theme }) => theme.lightText};
  height: 100%;
  .icon-container {
    background: ${({ theme }) => theme.darkBg};
    box-shadow: 0 0 2px ${({ theme }) => theme.shadow};
    height: inherit;
    width: fit-content;
    padding-right: 0.75rem;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
    .box-icon {
      font-size: 2.5rem;
    }
    .arrow-icon {
      font-size: 2rem;
      transition: all 0.2s ease-in-out;
    }
    .rotated-arrow {
      transform: rotateX(180deg);
    }
  }

  @media (max-width: 700px) {
    font-size: 0.6em;
    align-self: flex-end;
    .icon-container {
      padding: 0 0.5rem 0 0.25rem;
      .box-icon {
        font-size: 2rem;
      }
      .arrow-icon {
        font-size: 1.5rem;
      }
    }
  }
`;

const DropdownShadow = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 5rem;
  height: calc(100vh - 5rem);
  width: 100vw;
  z-index: 98;
  overflow: hidden;
`;

const AccountInfoDropdown = styled(motion.div)`
  background: ${({ theme }) => theme.darkBg};
  color: ${({ theme }) => theme.darkText};
  box-shadow: 0 3px 10px ${({ theme }) => theme.shadow};
  border-radius: 2px;
  position: absolute;
  right: 3rem;
  z-index: 99;
  padding: 1rem 0.5rem;
  cursor: default;
  p {
    margin: 0.5rem;
    font-weight: 300;
    display: flex;
    justify-content: flex-start;
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
      background-color: #b4b4b4;
      bottom: 0;
      cursor: pointer;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
    .slider:before {
      background-color: white;
      bottom: 2px;
      left: 2px;
      content: "";
      height: 16px;
      width: 16px;
      position: absolute;
      transition: 0.2s;
    }

    input:checked + .slider {
      background-color: #d8d8d8;
    }

    input:checked + .slider:before {
      transform: translateX(10px);
      background-color: rgb(92, 92, 92);
    }

    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  }

  @media (max-width: 700px) {
    font-size: 1.75em;
    text-align: center;
    width: 98vw;
    right: 1vw;
  }
`;

export default AccountInfo;
