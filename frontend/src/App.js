import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Styles
import "./styles/app.css";
// Components
import UserLogin from "./components/userLogin/UserLogin";
import CreateAccount from "./components/createAccount/CreateAccount";
import WordDetails from "./components/wordDetails/WordDetails";
import Home from "./components/home-page/Home";

import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [words, setWords] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [upvotedWords, setUpvotedWords] = useState([]);
  const [downvotedWords, setDownvotedWords] = useState([]);

  // Update all of users upvotes and downvotes
  const updateUsersWordVotes = async () => {
    const response = axios.post(`http://localhost:4001/api/users/${currentUser.userId}/votes`, {
      upvotedWords,
      downvotedWords,
    });
    try {
      const res = await response;
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  // Create a new word
  const postWordData = async (newWordData) => {
    console.log("posting new data");
    const response = axios.post("http://localhost:4001/api/words", {
      newWordData,
      type: "post-new-word",
    });
    try {
      await response;
      fetchWordData();
      return true;
    } catch (e) {
      if (e.response.status === 400) {
        return false;
      } else {
        console.log(e);
      }
    }
  };

  // Request to login with user email then validate password
  const handleUserLogin = async (userCreds) => {
    const response = axios.post("http://localhost:4001/api/users/login", { userCreds });
    try {
      const res = await response;
      if (res.status !== 200) {
        throw new Error("Invalid User Credentials");
      } else {
        setCurrentUser(res.data);
        setLoggedIn(true);
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // Create a new account
  const handleCreateAccount = async (userCreds) => {
    const response = axios.post("http://localhost:4001/api/users", { newUser: userCreds });
    try {
      const res = await response;
      setCurrentUser(res.data);
      setLoggedIn(true);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const [visitedWordIds, setVisitedWordIds] = useState([]);
  // Add a word to a user's visitedWordIds array
  const handleAddViewedWord = async (wordId) => {
    if (!visitedWordIds.includes(wordId)) {
      if (loggedIn) {
        const response = axios.post(`http://localhost:4001/api/users/${currentUser.userId}`, {
          wordId,
        });
        try {
          const res = await response;
          setVisitedWordIds(res.data);
        } catch (e) {
          console.log(e);
        }
      } else {
        setVisitedWordIds([...visitedWordIds, wordId]);
      }
    }
  };

  // Get all words from words api
  const fetchWordData = async () => {
    console.log("fetching new data");
    const response = axios.get("http://localhost:4001/api/words");
    try {
      const res = await response;
      setWords(res.data);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // Get all the recently viewed words id's for the current user
  const fetchAllUserData = async () => {
    const response = axios.get(`http://localhost:4001/api/users/${currentUser.userId}`);
    try {
      const res = await response;
      setCurrentUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Get all votes from the user
  const fetchAllUserVotes = async () => {
    const response = axios.get(`http://localhost:4001/api/users/${currentUser.userId}/votes`);
    try {
      const res = await response;
      const { allUpvotedWords, allDownvotedWords } = res.data;
      setUpvotedWords(allUpvotedWords);
      setDownvotedWords(allDownvotedWords);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchAllUserData();
    }
  }, [loggedIn]);

  useEffect(() => {
    fetchWordData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home
              currentUser={currentUser}
              loggedIn={loggedIn}
              postWordData={postWordData}
              words={words}
              handleAddViewedWord={handleAddViewedWord}
              visitedWordIds={visitedWordIds}
              upvotedWords={upvotedWords}
              setUpvotedWords={setUpvotedWords}
              downvotedWords={downvotedWords}
              setDownvotedWords={setDownvotedWords}
              updateUsersWordVotes={updateUsersWordVotes}
              fetchAllUserVotes={fetchAllUserVotes}
            />
          </Route>
          <Route path="/user-login">
            <UserLogin handleUserLogin={handleUserLogin} />
          </Route>
          <Route path="/create-account">
            <CreateAccount handleCreateAccount={handleCreateAccount} />
          </Route>
          <WordDetails words={words} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
