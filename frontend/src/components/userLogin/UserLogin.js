import React, { useState, useEffect } from "react";
// Router
import { Link, useHistory } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleUserLogin } from "../../redux/actions/userActions";
// Styles and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

const initialCreds = { email: "", password: "" };

function UserLogin() {
  //Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // Router
  const history = useHistory();
  // Local State
  const [loginCreds, setLoginCreds] = useState(initialCreds);
  const [invalidCreds, setInvalidCreds] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loginCreds.email && loginCreds.password) {
      dispatch(handleUserLogin(loginCreds)).catch((e) => {
        setInvalidCreds(true);
        setLoginCreds(initialCreds);
      });
    }
  };

  useEffect(() => {
    if (user.loggedIn) {
      setInvalidCreds(false);
      history.push("/");
    }
  }, [user, history]);

  const handleEmail = ({ target }) => {
    setLoginCreds({ ...loginCreds, email: target.value });
  };

  const handlePassword = ({ target }) => {
    setLoginCreds({ ...loginCreds, password: target.value });
  };

  return (
    <LoginFormContainer className="user-login-form">
      <form action="POST" onSubmit={handleFormSubmit}>
        <h1>Welcome back!</h1>
        {invalidCreds && <h4>Invalid email or password.</h4>}
        <label htmlFor="email">
          <h3>Email:</h3>
        </label>
        <input type="text" name="email" onChange={handleEmail} value={loginCreds.email} required />
        <label htmlFor="password">
          <h3>Password:</h3>
        </label>
        <input
          type="password"
          name="password"
          onChange={handlePassword}
          value={loginCreds.password}
          required
        />
        <button type="submit" className="form-btn">
          Log In
        </button>
      </form>
      <h3>Need an account?</h3>
      <Link to="/create-account">
        <button className="form-btn">Create Account</button>
      </Link>
    </LoginFormContainer>
  );
}

const LoginFormContainer = styled(motion.div)`
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
  } ;
`;

export default UserLogin;
