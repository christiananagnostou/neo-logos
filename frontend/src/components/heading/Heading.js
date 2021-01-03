import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AccountBox, ArrowDropDown } from "@material-ui/icons";

function Heading({ currentUser, loggedIn }) {
  const [displayAccountInfo, setDisplayAccountInfo] = useState(false);

  const handleIconClick = () => {
    setDisplayAccountInfo((prev) => !prev);
  };

  return (
    <header className="main-header">
      <div className="logo">
        <h1>Phantomnation</h1>
      </div>
      {loggedIn ? (
        <div className="account-info-container">
          <div className="account-icon-container" onClick={handleIconClick}>
            <ArrowDropDown
              className={
                displayAccountInfo ? "account-arrow-icon rotated-arrow" : "account-arrow-icon"
              }
            />
            <AccountBox className="account-box-icon" />
            <p>{currentUser.name}</p>
          </div>

          <div className={displayAccountInfo ? "account-info show" : "account-info hidden"}>
            <p>{currentUser.name}</p>
            <p>{currentUser.email}</p>
            <p>
              Member since: <br />
              {currentUser.accountCreated}
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
    </header>
  );
}

export default Heading;
