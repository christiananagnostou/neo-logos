import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleCreateAccount } from "../../redux/actions/userActions";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // setupNewAccState();
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
    <CreateAccountFormContainer className="create-account-form">
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
        <label htmlFor="name">Username</label>
        <input
          type="text"
          name="name"
          onChange={handleName}
          value={newAccountCreds.name}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={handleEmail}
          value={newAccountCreds.email}
          required
        />
        <label htmlFor="password">Password</label>
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
    </CreateAccountFormContainer>
  );
}

const CreateAccountFormContainer = styled(motion.div)`
  width: fit-content;
  margin: 4rem auto;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0px 5px 10px grey;
  border-radius: 5px;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    h1 {
      color: rgb(80, 80, 80);
    }
    label {
      font-weight: bold;
      font-size: 1.2rem;
      margin: 1rem;
    }
    input {
      width: 80%;
      margin: auto;
      padding: 0.5rem;
      font-size: 1.1rem;
      border: none;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgb(156, 156, 156);
      &:focus {
        outline: none;
        box-shadow: 0 0 2pt 2pt white;
      }
    }
    button {
      width: fit-content;
      margin: 1rem auto;
      padding: 0.5rem;
      border: none;
      border-radius: 5px;
      box-shadow: 0 0 5px rgb(125, 150, 204);
      background-color: rgb(226, 238, 250);
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: rgb(195, 221, 245);
      }
    }
  }
  h4 {
    padding: 2rem 0 1rem 0;
    border-top: 1px solid grey;
  }
  .login-link {
    width: fit-content;
    margin: auto;
    display: block;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px rgb(125, 150, 204);
    background-color: rgb(226, 238, 250);
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: rgb(195, 221, 245);
    }
  }
`;

export default UserLogin;
