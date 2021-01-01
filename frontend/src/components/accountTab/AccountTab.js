import React from "react";
import { Link } from "react-router-dom";

function AccountTab({ currentUser, loggedIn }) {
  return (
    <div className="account-tab">
      <div className="logo">
        <h1>PhantomNation</h1>
      </div>
      {loggedIn ? (
        <div style={{ border: "1px solid black", padding: ".5rem" }}>{currentUser.email}</div>
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
    </div>
  );
}

export default AccountTab;
