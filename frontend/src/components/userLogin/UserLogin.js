import React, { useState, useEffect } from "react";
// Router
import { Link, useHistory } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleUserLogin } from "../../redux/actions/userActions";

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
    <div className="user-login-form">
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
    </div>
  );
}

export default UserLogin;
