import axios from "axios";
import { FETCH_ALL_WORDS, GET_TOP_FIVE_WORDS } from "../types/wordsTypes";

export const getTopFiveWords = () => {
  return { type: GET_TOP_FIVE_WORDS };
};

// // Get all words from words api
export const getAllWords = () => async (dispatch) => {
  const allWords = await axios.get("http://localhost:4001/api/words");
  try {
    dispatch({
      type: FETCH_ALL_WORDS,
      payload: {
        allWords: allWords.data,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// Create a new word
export const postNewWord = (newWord) => async (dispatch) => {
  const addedWord = await axios.post("http://localhost:4001/api/words/new-word", { newWord });
  dispatch({
    type: "ADD_WORD",
    payload: {
      newWord: addedWord.data,
    },
  });
};

// Upvote or Downvote a word
export const voteOnWord = (wordId, direction) => async (dispatch) => {
  const voteData = await axios.post(`http://localhost:4001/api/words/${wordId}/vote`, {
    direction,
  });
  dispatch({
    type: "UPDATE_WORD_VOTES",
    payload: { voteCount: voteData.data.voteCount, wordId: voteData.data.wordId },
  });
};

// // Get voteCount for specific word
// const getVoteCount = async () => {
//   const response = axios.get(`http://localhost:4001/api/words/${word.wordId}/votes`);
//   try {
//     const res = await response;
//     return res.data;
//   } catch (e) {
//     console.log(e);
//   }
// };

// // Update vote after clicking vote
// const updateVote = async () => {
//   const response = axios.put(`http://localhost:4001/api/words/${word.wordId}/votes`, {
//     voteCount,
//   });
//   try {
//     const res = await response;
//     return res.status;
//   } catch (e) {
//     console.log(e);
//   }
// };
