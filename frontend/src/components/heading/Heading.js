import React, { useState } from "react";
// Router
import { Link } from "react-router-dom";
// Icons
import { AccountBox, ArrowDropDown } from "@material-ui/icons";
// Redux
import { useSelector } from "react-redux";

function Heading() {
  const user = useSelector((state) => state.user);
  
  const [displayAccountInfo, setDisplayAccountInfo] = useState(false);

  // Display info on click
  const handleIconClick = () => {
    setDisplayAccountInfo((prev) => !prev);
  };

  return (
    <header className="main-header">
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
    </header>
  );
}

export default Heading;
