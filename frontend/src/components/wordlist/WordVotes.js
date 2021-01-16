import React, { useState, useEffect } from "react";
// Icon
import ForwardOutlinedIcon from "@material-ui/icons/ForwardOutlined";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { userUpvote, handleDownvote } from "../../redux/actions/userActions";
import { voteOnWord } from "../../redux/actions/wordsActions";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function WordVotes({ word }) {
  // Redux
  const dispatch = useDispatch();
  const { loggedIn, upvoted_words, downvoted_words, id } = useSelector((state) => state.user);
  // Local State
  const [userUpvotedWord, setUserUpvotedWord] = useState(false);
  const [userDownvotedWord, setUserDownvotedWord] = useState(false);

  // If user has already voted on this this word
  useEffect(() => {
    if (loggedIn) {
      if (upvoted_words.includes(word.id)) {
        setUserUpvotedWord(true);
      } else {
        setUserUpvotedWord(false);
      }

      if (downvoted_words.includes(word.id)) {
        setUserDownvotedWord(true);
      } else {
        setUserDownvotedWord(false);
      }
    }
  }, [upvoted_words, downvoted_words, word.id, loggedIn]);

  const handleVoteClick = (direction) => {
    if (!loggedIn) {
      alert("no voting unless logged in");
    } else {
      switch (direction) {
        case "up":
          if (userDownvotedWord) {
            dispatch(handleDownvote(id, word.id));
            dispatch(voteOnWord(word.id, "up 2"));
          } else if (userUpvotedWord) {
            dispatch(voteOnWord(word.id, "down 1"));
          } else {
            dispatch(voteOnWord(word.id, "up 1"));
          }
          dispatch(userUpvote(id, word.id));
          break;
        case "down":
          if (userUpvotedWord) {
            dispatch(userUpvote(id, word.id));
            dispatch(voteOnWord(word.id, "down 2"));
          } else if (userDownvotedWord) {
            dispatch(voteOnWord(word.id, "up 1"));
          } else {
            dispatch(voteOnWord(word.id, "down 1"));
          }
          dispatch(handleDownvote(id, word.id));
          break;
        default:
          break;
      }
    }
  };

  return (
    <WordVotesContainer className="word-votes-container">
      <ForwardOutlinedIcon
        className={userUpvotedWord ? "upvote voted-up" : "upvote"}
        onClick={() => handleVoteClick("up")}
      />
      <VoteCount>{word.vote_count}</VoteCount>
      <ForwardOutlinedIcon
        className={userDownvotedWord ? "downvote voted-down" : "downvote"}
        onClick={() => handleVoteClick("down")}
      />
    </WordVotesContainer>
  );
}

const WordVotesContainer = styled(motion.div)`
  height: 100%;
  width: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.lightBg};
  color: ${({ theme }) => theme.lightText};
  padding: 5px 0;
  .upvote {
    transform: rotateZ(-90deg);
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: rgb(20, 180, 20);
      background: ${({ theme }) => theme.darkBg};
    }
  }
  .downvote {
    transform: rotateZ(90deg);
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: rgb(180, 20, 20);
      background: ${({ theme }) => theme.darkBg};
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
  color: ${({ theme }) => theme.lightText};
  font-weight: 300;
  font-size: .8rem;
`;

export default WordVotes;
