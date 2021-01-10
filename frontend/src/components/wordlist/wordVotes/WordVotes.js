import React, { useState, useEffect } from "react";
// Icon
import ForwardOutlinedIcon from "@material-ui/icons/ForwardOutlined";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { userUpvote, handleDownvote } from "../../../redux/actions/userActions";
import { voteOnWord } from "../../../redux/actions/wordsActions";

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
    <div className="word-votes">
      <ForwardOutlinedIcon
        className={userUpvotedWord ? "upvote voted-up" : "upvote"}
        onClick={() => handleVoteClick("up")}
      />
      <span className="vote-num">{word.voteCount}</span>
      <ForwardOutlinedIcon
        className={userDownvotedWord ? "downvote voted-down" : "downvote"}
        onClick={() => handleVoteClick("down")}
      />
    </div>
  );
}

export default WordVotes;
