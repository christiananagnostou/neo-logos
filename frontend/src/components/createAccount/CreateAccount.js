import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleCreateAccount } from "../../redux/actions/userActions";

const initialCreds = {
  name: "",
  email: "",
  password: "",
};

function UserLogin() {
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // Router
  const history = useHistory();
  const [newAccountCreds, setNewAccountCreds] = useState(initialCreds);
  const [accountAlreadyExists, setAccountAlreadyExists] = useState(false);

  const setupNewAccState = () => {
    newAccountCreds.recentlyViewedWords = [];
    newAccountCreds.upvotedWords = [];
    newAccountCreds.downvotedWords = [];
    newAccountCreds.loggedIn = false;
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    newAccountCreds.accountCreated = new Date().toDateString();
    setupNewAccState();
    dispatch(handleCreateAccount(newAccountCreds)).catch((e) => setAccountAlreadyExists(true));
    setNewAccountCreds(initialCreds);
  };

  useEffect(() => {
    if (user.loggedIn) {
      history.push("/");
      setAccountAlreadyExists(false);
    }
  }, [user, history]);

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
    <div className="create-account-form">
      <form action="POST" onSubmit={handleFormSubmit}>
        <h1>Welcome to the club!</h1>
        {accountAlreadyExists && (
          <h4 style={{ color: "red" }}>
            An account with that Email already exists. Click here to{" "}
            <Link to="user-login" style={{ textDecoration: "underline" }}>
              log in.
            </Link>
          </h4>
        )}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleName}
          value={newAccountCreds.name}
          required
        />
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
      </form>
      <div>
        <h4>Already have an account?</h4>
        <Link to="/user-login" className="login-link">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
