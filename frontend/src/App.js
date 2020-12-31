import React, { useEffect, useState } from "react";
import axios from "axios";
// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Styles
import "./styles/app.css";
// Components
import Wordlist from "./components/wordlist/Wordlist";
import WordEntryForm from "./components/wordEntryForm/WordEntryForm";
import AccountTab from "./components/accountTab/AccountTab";
import UserLogin from "./components/userLogin/UserLogin";

function App() {
  const [words, setWords] = useState([]);
  const [idCounter, setIdCounter] = useState(4);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const initialWordData = {
    word: "",
    wordId: idCounter,
    def: "",
    dateCreated: "",
    creator: "",
  };

  const [newWordData, setNewWordData] = useState(initialWordData);
  const [invalidWord, setInvalidWord] = useState(false);

  const fetchWordData = async () => {
    console.log("fetching new data");
    await axios.get("http://localhost:4001/api/words").then((res) => {
      setWords(res.data);
    });
  };

  const postWordData = async () => {
    console.log("posting new data");
    await axios
      .post("http://localhost:4001/api/words", { newWordData })
      .then(() => {
        setInvalidWord(false);
        setIdCounter((prevCounter) => (prevCounter += 1));
      })
      .catch((e) => {
        if (e.response.status === 400) {
          return setInvalidWord(true);
        }
      });
  };

  const resetWordData = () => {
    setNewWordData(initialWordData);
  };

  const fetchUserLogin = (userCreds) => {
    axios
      .get(`http://localhost:4001/api/users/${userCreds.email}`)
      .then((res) => {
        if (res.data.password !== userCreds.password) {
          throw new Error("Invalid User Credentials");
        } else {
          setCurrentUser(res.data);
          setLoggedIn(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    resetWordData();
    fetchWordData();
    // eslint-disable-next-line
  }, [idCounter]);

  useEffect(() => {
    if (loggedIn) {
      console.log("user logged in. Now reroute page back to home");
      // window.location.pathname = "/";
    }
  }, [loggedIn]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <AccountTab currentUser={currentUser} loggedIn={loggedIn} />
            <WordEntryForm
              setNewWordData={setNewWordData}
              newWordData={newWordData}
              postWordData={postWordData}
            />
            {invalidWord && (
              <h4 style={{ color: "red" }}>
                Please choose a new word. That word is already defined
              </h4>
            )}

            <Wordlist words={words} />
          </Route>
          {words.map((word) => {
            return (
              <Route path={`/${word.wordId}`} key={word.wordId}>
                <p>{word.word}</p>
                <p>{word.def}</p>
              </Route>
            );
          })}
          <Route path="/user-login">
            <UserLogin fetchUserLogin={fetchUserLogin} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
