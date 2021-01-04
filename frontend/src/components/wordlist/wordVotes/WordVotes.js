import React, { useState, useEffect } from "react";
import axios from "axios";
import ForwardOutlinedIcon from "@material-ui/icons/ForwardOutlined";

function WordVotes({
  word,
  loggedIn,
  upvotedWords,
  setUpvotedWords,
  downvotedWords,
  setDownvotedWords,
  updateUsersWordVotes,
  fetchAllUserVotes,
}) {
  const [voteCount, setVoteCount] = useState(word.voteCount);
  const [userUpvotedWord, setUserUpvotedWord] = useState(false);
  const [userDownvotedWord, setUserDownvotedWord] = useState(false);

  // Get voteCount for specific word
  const getVoteCount = async () => {
    const response = axios.get(`http://localhost:4001/api/words/${word.wordId}/votes`);
    try {
      const res = await response;
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  // Update vote after clicking vote
  const updateVote = async () => {
    const response = axios.put(`http://localhost:4001/api/words/${word.wordId}/votes`, {
      voteCount,
    });
    try {
      const res = await response;
      return res.status;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Get current votes this word when component mounts
    const getVotesOnLoad = async () => {
      const num = await getVoteCount();
      setVoteCount(num);
    };
    getVotesOnLoad();
  }, []);

  // Call after vote count has been updated
  useEffect(() => {
    if (loggedIn) {
      updateVote();
    }
  }, [voteCount]);

  useEffect(() => {
    // If user has already voted on this this word
    if (upvotedWords.includes(word.wordId)) {
      setUserUpvotedWord(true);
    } else if (downvotedWords.includes(word.wordId)) {
      setUserDownvotedWord(true);
    }
  }, [upvotedWords, downvotedWords]);

  // helper function for handleVoteClick
  const filterOutCurrentWord = (prevWordIds) => {
    return prevWordIds.filter((wordId) => wordId !== word.wordId);
  };

  const handleVoteClick = (direction) => {
    if (!loggedIn) {
      console.log("no voting unless logged in");
    } else {
      switch (direction) {
        case "up":
          if (userDownvotedWord) {
            //if already downvoted, remove the downvote
            setUserDownvotedWord(false);
            setDownvotedWords(filterOutCurrentWord);
            setVoteCount((prevCount) => (prevCount += 1));
          } else if (userUpvotedWord) {
            // if already upvoted, remove the upvote and break
            setUserUpvotedWord(false);
            setUpvotedWords(filterOutCurrentWord);
            setVoteCount((prevCount) => (prevCount -= 1));
            break;
          }
          setUserUpvotedWord(true); // add the upvote
          setUpvotedWords([...upvotedWords, word.wordId]);
          setVoteCount((prevCount) => (prevCount += 1));
          break;
        case "down":
          if (userUpvotedWord) {
            //if already upvoted, remove the upvote
            setUserUpvotedWord(false);
            setUpvotedWords(filterOutCurrentWord);
            setVoteCount((prevCount) => (prevCount -= 1));
          } else if (userDownvotedWord) {
            //if already downvoted, remove the downvote and break
            setUserDownvotedWord(false);
            setDownvotedWords(filterOutCurrentWord);
            setVoteCount((prevCount) => (prevCount += 1));
            break;
          }
          setUserDownvotedWord(true); // add the downvote
          setDownvotedWords([...downvotedWords, word.wordId]);
          setVoteCount((prevCount) => (prevCount -= 1));
          break;
        default:
          break;
      }
    }
  };

  const [alreadyRetrievedFromServer, setaAreadyRetrievedFromServer] = useState(false);
  useEffect(() => {
    if (loggedIn) {
      if (alreadyRetrievedFromServer) {
        updateUsersWordVotes();
      } else {
        fetchAllUserVotes();
        setaAreadyRetrievedFromServer(true);
      }
    }
  }, [userUpvotedWord, userDownvotedWord, alreadyRetrievedFromServer]);

  return (
    <div className="word-votes">
      <ForwardOutlinedIcon
        className={userUpvotedWord ? "upvote voted-up" : "upvote"}
        onClick={() => handleVoteClick("up")}
      />
      <span className="vote-num">{voteCount}</span>
      <ForwardOutlinedIcon
        className={userDownvotedWord ? "downvote voted-down" : "downvote"}
        onClick={() => handleVoteClick("down")}
      />
    </div>
  );
}

export default WordVotes;
