import React, { useState, useEffect } from "react";
// Icon
import ForwardOutlinedIcon from "@material-ui/icons/ForwardOutlined";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleUserUpvote, toggleUserDownvote } from "../../redux/actions/userActions";
import { voteOnWord } from "../../redux/actions/wordsActions";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function WordVotes({ word }) {
  // Redux
  const dispatch = useDispatch();
  const { loggedIn, upvotedWords, downvotedWords, _id } = useSelector((state) => state.user);
  // Local State
  const [userUpvotedWord, setUserUpvotedWord] = useState(false);
  const [userDownvotedWord, setUserDownvotedWord] = useState(false);

  // If user has already voted on this this word, set the vote icon show it
  useEffect(() => {
    if (loggedIn) {
      if (upvotedWords.includes(word._id)) {
        setUserUpvotedWord(true);
      } else {
        setUserUpvotedWord(false);
      }

      if (downvotedWords.includes(word._id)) {
        setUserDownvotedWord(true);
      } else {
        setUserDownvotedWord(false);
      }
    }
    //eslint-disable-next-line
  }, []);

  const handleVoteClick = (direction) => {
    if (!loggedIn) {
      alert("no voting unless logged in");
    } else {
      switch (direction) {
        case "up":
          if (userDownvotedWord) {
            dispatch(toggleUserDownvote(_id, word._id));
            dispatch(voteOnWord(word._id, "up 2"));
            setUserUpvotedWord(true);
          } else if (userUpvotedWord) {
            dispatch(voteOnWord(word._id, "down 1"));
            setUserUpvotedWord(false);
          } else {
            // no action was recorded prior
            dispatch(voteOnWord(word._id, "up 1"));
            setUserUpvotedWord(true);
          }
          dispatch(toggleUserUpvote(_id, word._id));
          setUserDownvotedWord(false);
          break;
        case "down":
          if (userUpvotedWord) {
            // was previously upvoted
            dispatch(toggleUserUpvote(_id, word._id));
            dispatch(voteOnWord(word._id, "down 2"));
            setUserDownvotedWord(true);
          } else if (userDownvotedWord) {
            // was previously downvoted
            dispatch(voteOnWord(word._id, "up 1"));
            setUserDownvotedWord(false);
          } else {
            // no action was recorded prior
            dispatch(voteOnWord(word._id, "down 1"));
            setUserDownvotedWord(true);
          }
          // remove any upvote and dispatch a downvotedWord to User
          setUserUpvotedWord(false);
          dispatch(toggleUserDownvote(_id, word._id));
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
      <VoteCount>{word.voteCount}</VoteCount>
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
  @media (max-width: 700px) {
    width: 40px;
    .upvote {
      &:hover {
        background: ${({ theme }) => theme.lightBg};
        color: ${({ theme }) => theme.lightText};
      }
      &:active {
        color: rgb(180, 20, 20);
        background: ${({ theme }) => theme.darkBg};
      }
    }
    .downvote {
      &:hover {
        background: ${({ theme }) => theme.lightBg};
        color: ${({ theme }) => theme.lightText};
      }
      &:active {
        color: rgb(180, 20, 20);
        background: ${({ theme }) => theme.darkBg};
      }
    }
  }
`;

const VoteCount = styled(motion.div)`
  color: ${({ theme }) => theme.lightText};
  font-weight: 300;
  font-size: 0.8rem;
`;

export default WordVotes;
