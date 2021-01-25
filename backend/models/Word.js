const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  partOfSpeech: {
    type: String,
  },
  def: {
    type: String,
    required: true,
  },
  example: {
    type: String,
  },
  dateCreated: {
    type: Number,
    default: Date.now,
    required: true,
  },
  voteCount: { type: Number, default: 0, required: true },
  creator: { type: String, required: true },
});

const Word = mongoose.model("Word", WordSchema);
module.exports = Word;
