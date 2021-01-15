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
        <h1>Hey you're back!</h1>
        {invalidCreds && <h4 style={{ color: "red" }}>Invalid email or password.</h4>}
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" onChange={handleEmail} value={loginCreds.email} required />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handlePassword}
          value={loginCreds.password}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <div>
        <h4>Need an account?</h4>
        <Link to="/create-account" className="create-account-link">
          Create an Account
        </Link>
      </div>
    </LoginFormContainer>
  );
}

const LoginFormContainer = styled(motion.div)`
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
      width: 90%;
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
  .create-account-link {
    width: fit-content;
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
