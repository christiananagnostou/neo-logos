import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AccountBox, ArrowDropDown, ArrowDropUp } from "@material-ui/icons";

function AccountTab({ currentUser, loggedIn }) {
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
            {displayAccountInfo ? (
              <ArrowDropUp className="account-arrow-icon" />
            ) : (
              <ArrowDropDown className="account-arrow-icon" />
            )}
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
            <div className="account-login account-btn">Login</div>
          </Link>
          <Link to="/create-account">
            <div className="account-create account-btn">Create Account</div>
          </Link>
        </div>
      )}
    </header>
  );
}

export default AccountTab;
