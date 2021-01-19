const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountCreated: {
      type: Number,
      default: Date.now,
      required: true,
    },
    upvotedWords: { type: Array, required: true },
    downvotedWords: { type: Array, required: true },
    viewHistory: { type: Array, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
