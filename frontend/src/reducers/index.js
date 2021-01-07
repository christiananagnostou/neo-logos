import { combineReducers } from "redux";
import userReducer from "./userReducer";
import wordsReducer from "./wordReducer";

const combinedReducers = combineReducers({ user: userReducer, words: wordsReducer });

export default combinedReducers;
