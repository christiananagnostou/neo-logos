import { combineReducers } from "redux";
import userReducer from "./userReducer";
import wordsReducer from "../reducers/wordsReducer";

const rootReducer = combineReducers({ user: userReducer, words: wordsReducer });

export default rootReducer;
