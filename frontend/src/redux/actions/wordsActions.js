import axios from "axios";
import { FETCH_ALL_WORDS, ADD_WORD, UPDATE_WORD_VOTES } from "../types/wordsTypes";

// Get all words
export const getAllWords = () => async (dispatch) => {
  const allWords = await axios.get("http://localhost:4001/api/words");
  try {
    dispatch({
      type: FETCH_ALL_WORDS,
      payload: {
        allWords: allWords.data.words,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// Create a new word
export const postNewWord = (newWord) => async (dispatch) => {
  const addedWord = await axios.post("http://localhost:4001/api/words", { newWord });
  dispatch({
    type: ADD_WORD,
    payload: {
      newWord: addedWord.data.word,
    },
  });
};

// Upvote or Downvote a word
export const voteOnWord = (wordId, direction) => async (dispatch) => {
  const voteData = await axios.post(`http://localhost:4001/api/words/${wordId}/vote`, {
    direction,
  });
  dispatch({
    type: UPDATE_WORD_VOTES,
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
