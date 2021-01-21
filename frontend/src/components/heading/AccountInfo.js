import React, { useState, useEffect, useRef } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleNightMode } from "../../redux/actions/userActions";
// Utils
import { timeConverter } from "../../utils/utils";
// Icons
import { AccountBox, ArrowDropDown } from "@material-ui/icons";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function AccountInfo() {
  //Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // Local State
  const [displayAccountInfo, setDisplayAccountInfo] = useState(false);
  // Ref
  const wrapperRef = useRef();

  // Display info on click
  const handleIconClick = (e) => {
    setDisplayAccountInfo((prev) => !prev);
  };

  // Toggle Night Mode
  const toggleMode = () => {
    dispatch(toggleNightMode());
  };

  useEffect(() => {
    const clickListener = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDisplayAccountInfo(false);
      }
    };

    // Attach event listner
    displayAccountInfo && document.addEventListener("click", clickListener, true);

    return () => {
      document.removeEventListener("click", clickListener, true);
    };
  }, [displayAccountInfo]);

  return (
    <AccountInfoContainer ref={wrapperRef}>
      <div className="icon-container" onClick={handleIconClick}>
        <ArrowDropDown className={displayAccountInfo ? "arrow-icon rotated-arrow" : "arrow-icon"} />
        <AccountBox className="box-icon" />
      </div>
      <div className="wrapper">
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
      </div>
    </AccountInfoContainer>
  );
}

const AccountInfoContainer = styled(motion.div)`
  color: ${({ theme }) => theme.lightText};
  justify-self: end;
  height: 100%;
  .icon-container {
    background: ${({ theme }) => theme.darkBg};
    box-shadow: 0 0 5px ${({ theme }) => theme.shadow};
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
  .wrapper {
    position: absolute;
    top: 100%;
    right: 2.5rem;
    overflow: hidden;
    padding: 0.25rem 0.5rem 0.5rem;
    .hidden {
      opacity: 0;
      top: -15rem;
    }
    .show {
      opacity: 1;
      top: 0;
    }
    .account-info {
      background: ${({ theme }) => theme.darkBg};
      color: ${({ theme }) => theme.darkText};
      box-shadow: 0 3px 3px ${({ theme }) => theme.shadow};
      border-radius: 2px;
      position: relative;
      z-index: 99;
      padding: 1rem 0.5rem;
      transition: all 0.2s ease-in-out;
      cursor: default;
      p {
        margin: 0.5rem;
        font-weight: 300;
        display: flex;
        justify-content: flex-start;
        align-items: center;
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
  }
  @media (max-width: 700px) {
    font-size: 0.6em;
    align-self: flex-end;
    .icon-container {
      padding: 0;
      .box-icon {
        font-size: 2rem;
      }
      .arrow-icon {
        font-size: 1.5rem;
      }
    }
    .wrapper {
      right: 0.1rem;
      .account-info {
        font-size: 1.5em;
      }
    }
  }
`;

export default AccountInfo;
