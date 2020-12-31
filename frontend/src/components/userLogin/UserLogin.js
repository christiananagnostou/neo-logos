import React, { useState } from "react";

function UserLogin({ fetchUserLogin }) {
  const initialCreds = {
    email: "",
    password: "",
  };
  const [loginCreds, setLoginCreds] = useState(initialCreds);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loginCreds.email && loginCreds.password) {
      await fetchUserLogin(loginCreds);
      setLoginCreds(initialCreds);
    }
  };

  const handleEmail = ({ target }) => {
    setLoginCreds({ ...loginCreds, email: target.value });
  };

  const handlePassword = ({ target }) => {
    setLoginCreds({ ...loginCreds, password: target.value });
  };

  return (
    <form action="POST" onSubmit={handleFormSubmit} className="user-login-form">
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
  );
}

export default UserLogin;
