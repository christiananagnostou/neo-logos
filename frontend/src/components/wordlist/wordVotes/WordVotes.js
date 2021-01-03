import React, { useState, useEffect } from "react";
import axios from "axios";
import ForwardOutlinedIcon from "@material-ui/icons/ForwardOutlined";

function WordVotes({ word, loggedIn, upvotedWords, setUpvotedWords }) {
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

  useEffect(() => {
    // Get current votes when component mounts
    const getVotesOnLoad = async () => {
      const num = await getVoteCount();
      setVoteCount(num);
    };
    getVotesOnLoad();

    // If user has already upvoted this word
    if (upvotedWords.includes(word.wordId)) {
      setUserUpvotedWord(true);
    }
  }, []);

  // Update vote after clicking vote
  const updateVote = async () => {
    const response = axios.put(`http://localhost:4001/api/words/${word.wordId}/votes`, {
      voteCount,
    });
    try {
      const res = await response;
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleVoteClick = (direction) => {
    if (userUpvotedWord | userDownvotedWord | !loggedIn) {
      console.log("no more voting on word");
    } else {
      switch (direction) {
        case "up":
          setUserUpvotedWord(true);
          setUpvotedWords([...upvotedWords, word.wordId]);
          setVoteCount((prevCount) => (prevCount += 1));
          break;
        case "down":
          setUserDownvotedWord(true);
          setVoteCount((prevCount) => (prevCount -= 1));
          break;
        default:
          break;
      }
    }
  };

  // Call after vote count has been updated
  useEffect(() => {
    if (loggedIn & userUpvotedWord) {
      updateVote();
    }
  }, [voteCount]);

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
