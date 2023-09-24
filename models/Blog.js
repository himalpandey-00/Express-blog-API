const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
    vote: [{ user_id: String }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
