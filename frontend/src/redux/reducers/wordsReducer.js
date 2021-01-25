import { SET_DISPLAY_WORDS, ADD_WORD, UPDATE_WORD_VOTES, DELETE_WORD } from "../types/wordsTypes";

const initialWordsState = { wordsDisplay: [], wordsSorting: "hot" };

const wordsReducer = (wordsState = initialWordsState, action) => {
  switch (action.type) {
    case SET_DISPLAY_WORDS:
      return {
        ...wordsState,
        wordsDisplay: [...action.payload.allWords],
        wordsSorting: action.payload.sortingOrder,
      };
    case ADD_WORD:
      return { ...wordsState, wordsDisplay: [action.payload.newWord, ...wordsState.wordsDisplay] };
    case UPDATE_WORD_VOTES:
      const wordIndex = wordsState.wordsDisplay.findIndex((word) => {
        return word._id === action.payload._id;
      });
      wordsState.wordsDisplay[wordIndex].voteCount = action.payload.voteCount;
      return { ...wordsState };
    case DELETE_WORD:
      const filterOutDeleted = wordsState.wordsDisplay.filter((word) => {
        return word._id !== action.payload.deletedWord._id;
      });
      return { ...wordsState, wordsDisplay: [...filterOutDeleted] };
    default:
      return { ...wordsState };
  }
};

export default wordsReducer;
