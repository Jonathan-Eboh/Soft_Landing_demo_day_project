const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("Post", PostSchema);
