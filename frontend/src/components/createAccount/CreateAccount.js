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
        <button type="submit" className="create-account btn">
          Create Account
        </button>
      </form>
      <h3>Have an account?</h3>
      <Link to="/user-login">
        <button className="login btn">Log In</button>
      </Link>
    </CreateAccountFormContainer>
  );
}

const CreateAccountFormContainer = styled(motion.div)`
  box-shadow: 0 0 5px ${({ theme }) => theme.shadow};
  background: ${({ theme }) => theme.medText};
  color: ${({ theme }) => theme.lightBg};

  width: fit-content;
  margin: 4rem auto;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  gap: 1rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    h1 {
      color: ${({ theme }) => theme.gold};
    }
    label {
      font-weight: 100;
      font-size: 1.2rem;
      margin: 1rem;
      margin: 0.25rem 0rem;
    }
    input {
      width: 90%;
      margin: auto;
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      padding: 0.25rem;
      border: none;
      border-radius: 2px;
      &:focus {
        outline: none;
        box-shadow: 0 0 5px ${({ theme }) => theme.shadow};
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

  .btn {
    letter-spacing: 1px;
    font-weight: 400;
    font-family: "Montserrat", sans-serif;
    font-size: 0.9rem;
    background: ${({ theme }) => theme.darkBg};
    box-shadow: 0 0 5px ${({ theme }) => theme.darkBg};
    color: ${({ theme }) => theme.lightText};
    border-radius: 3px;
    border: none;
    padding: 1rem;
    margin: 0 0.25rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: ${({ theme }) => theme.gold};
      font-weight: 400;
    }
  }
`;

export default UserLogin;
