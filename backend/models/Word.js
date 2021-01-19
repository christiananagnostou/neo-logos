const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  def: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Number,
    default: Date.now,
    required: true,
  },
  upvotes: { type: Number, default: 0, required: true },
  downvotes: { type: Number, default: 0, required: true },
  creator: { type: String, required: true },
});

const Word = mongoose.model("Word", WordSchema);
module.exports = Word;
