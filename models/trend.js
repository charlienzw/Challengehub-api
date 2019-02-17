var mongoose = require("mongoose");

var trendsSchema = new mongoose.Schema ({
  userId: mongoose.Schema.Types.ObjectId,
  videoId: mongoose.Schema.Types.ObjectId,
  hasLiked: Number
});

module.exports = mongoose.model('Trend', trendsSchema);