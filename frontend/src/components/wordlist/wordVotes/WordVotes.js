import React, { useState, useEffect } from "react";
// Icon
import ForwardOutlinedIcon from "@material-ui/icons/ForwardOutlined";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { userUpvote, handleDownvote } from "../../../redux/actions/userActions";
import { voteOnWord } from "../../../redux/actions/wordsActions";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function WordVotes({ word }) {
  // Redux
  const dispatch = useDispatch();
  const { loggedIn, upvotedWords, downvotedWords, userId } = useSelector((state) => state.user);
  // Local State
  const [userUpvotedWord, setUserUpvotedWord] = useState(false);
  const [userDownvotedWord, setUserDownvotedWord] = useState(false);

  // If user has already voted on this this word
  useEffect(() => {
    if (upvotedWords.includes(word.wordId)) {
      setUserUpvotedWord(true);
    } else {
      setUserUpvotedWord(false);
    }

    if (downvotedWords.includes(word.wordId)) {
      setUserDownvotedWord(true);
    } else {
      setUserDownvotedWord(false);
    }
  }, [upvotedWords, downvotedWords, word.wordId]);

  const handleVoteClick = (direction) => {
    if (!loggedIn) {
      alert("no voting unless logged in");
    } else {
      switch (direction) {
        case "up":
          if (userDownvotedWord) {
            dispatch(handleDownvote(userId, word.wordId));
            dispatch(voteOnWord(word.wordId, "up"));
            dispatch(voteOnWord(word.wordId, "up"));
          } else if (userUpvotedWord) {
            dispatch(voteOnWord(word.wordId, "down"));
          } else {
            dispatch(voteOnWord(word.wordId, "up"));
          }
          dispatch(userUpvote(userId, word.wordId));

          break;
        case "down":
          if (userUpvotedWord) {
            dispatch(userUpvote(userId, word.wordId));
            dispatch(voteOnWord(word.wordId, "down"));
            dispatch(voteOnWord(word.wordId, "down"));
          } else if (userDownvotedWord) {
            dispatch(voteOnWord(word.wordId, "up"));
          } else {
            dispatch(voteOnWord(word.wordId, "down"));
          }
          dispatch(handleDownvote(userId, word.wordId));

          console.log("vote -");
          break;
        default:
          break;
      }
    }
  };

  return (
    <WordVotesContainer layoutId={`votes ${word.word}`} className="word-votes-container">
      <ForwardOutlinedIcon
        className={userUpvotedWord ? "upvote voted-up" : "upvote"}
        onClick={() => handleVoteClick("up")}
      />
      <VoteCount layoutId={`voteCount ${word.word}`}>{word.voteCount}</VoteCount>
      <ForwardOutlinedIcon
        className={userDownvotedWord ? "downvote voted-down" : "downvote"}
        onClick={() => handleVoteClick("down")}
      />
    </WordVotesContainer>
  );
}

const WordVotesContainer = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;

  .upvote {
    transform: rotateZ(-90deg);
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: rgb(20, 180, 20);
      background: rgb(236, 236, 236);
    }
  }
  .downvote {
    transform: rotateZ(90deg);
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: rgb(180, 20, 20);
      background: rgb(236, 236, 236);
    }
  }
  .voted-up {
    color: rgb(20, 180, 20) !important;
  }
  .voted-down {
    color: rgb(180, 20, 20) !important;
  }
`;

const VoteCount = styled(motion.div)`
  color: rgb(73, 73, 73);
`;

export default WordVotes;
