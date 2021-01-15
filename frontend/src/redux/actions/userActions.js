import axios from "axios";
// Types
import { USER_LOGIN, UPDATE_UPVOTES, UPDATE_DOWNVOTES, ADD_VIEWED_WORD } from "../types/userTypes";

// Request to login with user email then validate password
export const handleUserLogin = (userCreds) => async (dispatch) => {
  const userData = await axios.post("http://localhost:4001/api/users/login", { userCreds });
  try {
    dispatch({
      type: USER_LOGIN,
      payload: {
        userData: userData.data.user,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// Add a word to user's recentlyViewedWords
export const addViewedWord = (word_id, user_id) => async (dispatch) => {
  const viewedWords = await axios.post(`http://localhost:4001/api/users/${user_id}/viewed-word`, {
    word_id,
  });
  dispatch({
    type: ADD_VIEWED_WORD,
    payload: {
      viewedWords: viewedWords.data,
    },
  });
};

// Add / remove a word to users upvotedWords
export const userUpvote = (user_id, word_id) => async (dispatch) => {
  const upvotedWords = await axios.post(`http://localhost:4001/api/users/${user_id}/upvoted`, {
    word_id,
  });
  dispatch({
    type: UPDATE_UPVOTES,
    payload: {
      upvotedWords: upvotedWords.data,
    },
  });
};

// Add / remove a word to users downvotedWords
export const handleDownvote = (user_id, word_id) => async (dispatch) => {
  const downvotedWords = await axios.post(`http://localhost:4001/api/users/${user_id}/downvoted`, {
    word_id,
  });
  dispatch({
    type: UPDATE_DOWNVOTES,
    payload: {
      downvotedWords: downvotedWords.data,
    },
  });
};

// // Create a new account
export const handleCreateAccount = (userCreds) => async (dispatch) => {
  const response = await axios.post("http://localhost:4001/api/users", { newUser: userCreds });
  console.log(response.data);
  dispatch({
    type: USER_LOGIN,
    payload: {
      userData: response.data.user,
    },
  });
};

// // Update all of users upvotes and downvotes
// const updateUsersWordVotes = async () => {
//   const response = axios.post(`http://localhost:4001/api/users/${currentUser.userId}/votes`, {
//     upvotedWords,
//     downvotedWords,
//   });
//   try {
//     const res = await response;
//     return res;
//   } catch (e) {
//     console.log(e);
//   }
// };

// // Get all votes from the user
// const fetchAllUserVotes = async () => {
//   const response = axios.get(`http://localhost:4001/api/users/${currentUser.userId}/votes`);
//   try {
//     const res = await response;
//     const { allUpvotedWords, allDownvotedWords } = res.data;
//     setUpvotedWords(allUpvotedWords);
//     setDownvotedWords(allDownvotedWords);
//   } catch (e) {
//     console.log(e);
//   }
// };
