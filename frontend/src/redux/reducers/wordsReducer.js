import {
  FETCH_ALL_WORDS,
  GET_TOP_FIVE_WORDS,
  ADD_WORD,
  UPDATE_WORD_VOTES,
} from "../types/wordsTypes";

const initialWordsState = [];

const wordsReducer = (wordsState = initialWordsState, action) => {
  switch (action.type) {
    case FETCH_ALL_WORDS:
      return [...action.payload.allWords];
    case GET_TOP_FIVE_WORDS:
      return {
        topFiveWords: wordsState.sort((a, b) => b.voteCount - a.voteCount).slice(0, 5),
      };
    case ADD_WORD:
      return [action.payload.newWord, ...wordsState];
    case UPDATE_WORD_VOTES:
      const wordIndex = wordsState.findIndex((word) => word.wordId === action.payload.wordId);
      wordsState[wordIndex].voteCount = action.payload.voteCount;
      return [...wordsState];
    default:
      return [...wordsState];
  }
};

export default wordsReducer;
