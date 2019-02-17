var mongoose = require("mongoose");

var videosSchema = new mongoose.Schema ({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  liveStream: String,
  challengeId: mongoose.Schema.Types.ObjectId,
  viewedTime: Number,
  likeCount: Number
});

module.exports = mongoose.model('Video', videosSchema);