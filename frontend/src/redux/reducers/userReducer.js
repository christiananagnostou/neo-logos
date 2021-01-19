import {
  USER_LOGIN,
  UPDATE_UPVOTES,
  UPDATE_DOWNVOTES,
  ADD_VIEWED_WORD,
  TOGGLE_NIGHTMODE,
} from "../types/userTypes";

const initialUserState = {
  name: "",
  email: "",
  accountCreated: "",
  viewHistory: [],
  upvotedWords: [],
  downvotedWords: [],
  loggedIn: false,
  nightMode: false,
};

const userReducer = (userState = initialUserState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...userState, ...action.payload.userData, loggedIn: true };
    case UPDATE_UPVOTES:
      return { ...userState, upvotedWords: [...action.payload.upvotedWords] };
    case UPDATE_DOWNVOTES:
      return { ...userState, downvotedWords: [...action.payload.downvotedWords] };
    case ADD_VIEWED_WORD:
      return {
        ...userState,
        viewHistory: [...action.payload.recentlyViewed],
      };
    case TOGGLE_NIGHTMODE:
      return { ...userState, nightMode: !userState.nightMode };
    default:
      return { ...userState };
  }
};

export default userReducer;
