import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function UserLogin({ handleCreateAccount }) {
  const history = useHistory();
  const initialInfo = {
    name: "",
    email: "",
    password: "",
  };
  const [newAccountCreds, setNewAccountCreds] = useState(initialInfo);
  const [accountAlreadyExists, setAccountAlreadyExists] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const creationDate = Date();
    newAccountCreds.accountCreated = creationDate;
    const accountCreated = await handleCreateAccount(newAccountCreds);
    console.log("account", accountCreated);
    setNewAccountCreds(initialInfo);
    if (accountCreated) {
      history.push("/");
      setAccountAlreadyExists(false);
    } else {
      setAccountAlreadyExists(true);
    }
  };

  const handleName = ({ target }) => {
    setNewAccountCreds({ ...newAccountCreds, name: target.value });
  };
  const handleEmail = ({ target }) => {
    setNewAccountCreds({ ...newAccountCreds, email: target.value });
  };

  const handlePassword = ({ target }) => {
    setNewAccountCreds({ ...newAccountCreds, password: target.value });
  };

  return (
    <form action="POST" onSubmit={handleFormSubmit} className="create-account-form">
      <h1>Welcome to the club!</h1>
      {accountAlreadyExists && (
        <h4 style={{ color: "red" }}>
          An account with that Email already exists. Please{" "}
          <Link to="user-login" style={{ textDecoration: "underline" }}>
            log in.
          </Link>
        </h4>
      )}
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" onChange={handleName} value={newAccountCreds.name} required />
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        onChange={handleEmail}
        value={newAccountCreds.email}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        onChange={handlePassword}
        value={newAccountCreds.password}
        required
      />
      <button type="submit">Create Account</button>
      <div>
        <h3>Already have an account?</h3>
        <Link to="/user-login">Log In</Link>
      </div>
    </form>
  );
}

export default UserLogin;
