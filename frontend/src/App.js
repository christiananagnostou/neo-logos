import React from "react";
// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Components
import UserLogin from "./components/userLogin/UserLogin";
import CreateAccount from "./components/createAccount/CreateAccount";
import Home from "./components/home-page/Home";
// Styling and animation
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/Themes";

function App() {
  const { nightMode } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={nightMode ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
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
      </>
    </ThemeProvider>
  );
}

export default App;
