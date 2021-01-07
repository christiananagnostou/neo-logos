// const userState = {
//   name: "",
//   email: "",
//   accountCreated: "",
//   userId: "",
//   recentlyViewedWords: [],
//   upvotedWords: [],
//   downvotedWords: [],
// };

const userReducer = (
  userState = {
    name: "",
    email: "",
    accountCreated: "",
    userId: "",
    recentlyViewedWords: [],
    upvotedWords: [],
    downvotedWords: [],
  },
  action
) => {
  switch (action.type) {
    case "USER_LOGIN":
      return (userState = action.user);
    case "UPDATE_UPVOTES":
      return (userState.upvotedWords = [userState.upvotedWords, action.upvotedWord]);
    case "UPDATE_DOWNVOTES":
      return (userState.downvotedWords = [userState.downvotedWords, action.downvotedWord]);
    case "UPDATE_RECENTLY_VIEWED_WORDS":
      return (userState.recentlyViewedWords = [
        ...userState.recentlyViewedWords,
        action.recentlyViewedWord,
      ]);
    default:
      return userState;
  }
};

export default userReducer;
