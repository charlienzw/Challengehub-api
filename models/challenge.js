var mongoose = require("mongoose");

var challengesSchema = new mongoose.Schema ({
  name: String,
  desc: String,
  prize: Number,
  userId: mongoose.Schema.Types.ObjectId,
  hitCount: Number
});

module.exports = mongoose.model('Challenge', challengesSchema);