import React from "react";
// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Styles
import "./styles/app.css";
// Components
import UserLogin from "./components/userLogin/UserLogin";
import CreateAccount from "./components/createAccount/CreateAccount";
import Home from "./components/home-page/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={["/word/:wordId", "/"]} exact>
            <Home />
          </Route>
          <Route path="/user-login">
            <UserLogin />
          </Route>
          <Route path="/create-account">
            <CreateAccount />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
