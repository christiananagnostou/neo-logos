import React, { useState } from "react";
import ForwardOutlinedIcon from "@material-ui/icons/ForwardOutlined";

function WordVotes() {
  const [voteCount, setVoteCount] = useState(0);

  const handleVoteClick = (direction) => {
    switch (direction) {
      case "up":
        setVoteCount((prevCount) => (prevCount += 1));
        break;
      case "down":
        setVoteCount((prevCount) => (prevCount -= 1));
        break;
      default:
        break;
    }
  };
  return (
    <div className="word-votes">
      <ForwardOutlinedIcon className="upvote" onClick={() => handleVoteClick("up")} />
      <span className="vote-num">{voteCount}</span>
      <ForwardOutlinedIcon className="downvote" onClick={() => handleVoteClick("down")} />
    </div>
  );
}

export default WordVotes;
