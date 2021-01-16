import { SET_DISPLAY_WORDS, ADD_WORD, UPDATE_WORD_VOTES } from "../types/wordsTypes";

const initialWordsState = [];

const wordsReducer = (wordsState = initialWordsState, action) => {
  switch (action.type) {
    case SET_DISPLAY_WORDS:
      return [...action.payload.allWords];
    case ADD_WORD:
      return [action.payload.newWord, ...wordsState];
    case UPDATE_WORD_VOTES:
      const wordIndex = wordsState.findIndex((word) => word.id === action.payload.wordId);
      wordsState[wordIndex].vote_count = action.payload.voteCount;
      return [...wordsState];
    default:
      return [...wordsState];
  }
};

export default wordsReducer;
