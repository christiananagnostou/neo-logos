import axios from "axios";
import { SET_DISPLAY_WORDS, ADD_WORD, UPDATE_WORD_VOTES } from "../types/wordsTypes";

// Get all words
export const getAllWords = () => async (dispatch) => {
  const allWords = await axios.get("/api/words");
  dispatch({
    type: SET_DISPLAY_WORDS,
    payload: { allWords: allWords.data.words },
  });
};

// Create a new word
export const postNewWord = (newWord) => async (dispatch) => {
  const addedWord = await axios.post("/api/words", { newWord });
  dispatch({
    type: ADD_WORD,
    payload: { newWord: addedWord.data.word },
  });
};

// Upvote or Downvote a word
export const voteOnWord = (wordId, direction) => async (dispatch) => {
  const updatedWord = await axios.post(`/api/words/${wordId}/vote`, {
    direction,
  });
  dispatch({
    type: UPDATE_WORD_VOTES,
    payload: updatedWord.data,
  });
};

export const searchWord = (term) => async (dispatch) => {
  const relatedWords = await axios.get(`/api/words/search/${term}`);
  dispatch({
    type: SET_DISPLAY_WORDS,
    payload: { allWords: relatedWords.data.words },
  });
};

export const orderWordsBy = (order) => async (dispatch) => {
  const orderedWords = await axios.get(`/api/words/order-by/${order}`);
  dispatch({
    type: SET_DISPLAY_WORDS,
    payload: { allWords: orderedWords.data },
  });
};

export const deleteWord = (wordId) => async (dispatch) => {
  const deletedWord = await axios.delete(`/api/words/${wordId}`);
  dispatch({
    type: "DELETE_WORD",
    payload: { deletedWord: deletedWord.data },
  });
};
