import React from "react";
import { Link } from "react-router-dom";

function AccountTab({ currentUser, loggedIn }) {
  return (
    <div className="account-tab">
      {loggedIn ? (
        <div>{currentUser.name + " " + currentUser.email}</div>
      ) : (
        <>
          <Link to="/user-login">
            <div className="account-login account-btn">Login</div>
          </Link>
          <Link to="/create-account">
            <div className="account-create account-btn">Create Account</div>
          </Link>
        </>
      )}
    </div>
  );
}

export default AccountTab;
