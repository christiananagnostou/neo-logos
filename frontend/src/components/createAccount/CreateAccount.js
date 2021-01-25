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
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // setupNewAccState();
    dispatch(handleCreateAccount(newAccountCreds)).catch((e) => {
      const responseCode = e.response.status;
      responseCode === 451 ? setEmailAlreadyExists(true) : setEmailAlreadyExists(false);
      responseCode === 452 ? setUsernameAlreadyExists(true) : setUsernameAlreadyExists(false);
    });

    setNewAccountCreds(initialCreds);
  };

  useEffect(() => {
    if (user.loggedIn) {
      history.push("/");
    }
    return () => {
      setEmailAlreadyExists(false);
      setUsernameAlreadyExists(false);
    };
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
        {emailAlreadyExists && (
          <h4>
            An account with that Email already exists. Click here to{" "}
            <Link to="/login" style={{ textDecoration: "underline" }}>
              log in.
            </Link>
          </h4>
        )}
        {usernameAlreadyExists && (
          <h4>An account with that username already exists. Try a different one.</h4>
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
        <button type="submit" className="form-btn">
          Create Account
        </button>
      </form>
      <h3>Have an account?</h3>
      <Link to="/login">
        <button className="form-btn">Log In</button>
      </Link>
    </CreateAccountFormContainer>
  );
}

const CreateAccountFormContainer = styled(motion.div)`
  box-shadow: 0 0 5px ${({ theme }) => theme.shadow};
  background: ${({ theme }) => theme.lightBg};
  color: ${({ theme }) => theme.darkText};

  width: fit-content;
  margin: 4rem auto;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  gap: 1rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    h1 {
      color: ${({ theme }) => theme.gold};
    }
    h4 {
      color: ${({ theme }) => theme.gold};

      a {
        color: ${({ theme }) => theme.darkText};
      }
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
  }

  .form-btn {
    margin-top: 0.5rem;
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
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: ${({ theme }) => theme.gold};
      font-weight: 400;
    }
  }
  @media (max-width: 700px) {
    background: ${({ theme }) => theme.medBg};
    width: 100%;
    box-shadow: none;
  }
`;

export default UserLogin;
