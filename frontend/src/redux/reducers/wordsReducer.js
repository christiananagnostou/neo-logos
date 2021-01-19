import { SET_DISPLAY_WORDS, ADD_WORD, UPDATE_WORD_VOTES } from "../types/wordsTypes";

const initialWordsState = [];

const wordsReducer = (wordsState = initialWordsState, action) => {
  switch (action.type) {
    case SET_DISPLAY_WORDS:
      return [...action.payload.allWords];
    case ADD_WORD:
      return [action.payload.newWord, ...wordsState];
    case UPDATE_WORD_VOTES:
      const wordIndex = wordsState.findIndex((word) => word._id === action.payload._id);
      wordsState[wordIndex].voteCount = action.payload.voteCount;
      return [...wordsState];
    case "DELETE_WORD":
      const filterOutDeleted = wordsState.filter(
        (word) => word._id !== action.payload.deletedWord._id
      );
      return [...filterOutDeleted];
    default:
      return [...wordsState];
  }
};

export default wordsReducer;
