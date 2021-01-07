// const wordsState = {
//   word: "lamerty",
//   wordId: uuidv4(),
//   def: "Keyboard configuration for lame people",
//   dateCreated: Date(),
//   creator: "Bob",
//   voteCount: 1125,
// };

const wordReducer = (
  wordState = {
    word: "",
    wordId: "",
    def: "",
    dateCreated: Date(),
    creator: "",
    voteCount: 0,
  },
  action
) => {
  switch (action.type) {
    case "USER_LOGIN":
      return wordState;
    case "UPDATE_UPVOTES":
      return wordState;
    case "UPDATE_DOWNVOTES":
      return wordState;
    case "UPDATE_RECENTLY_VIEWED_WORDS":
      return wordState;
    default:
      return wordState;
  }
};

export default wordReducer;
