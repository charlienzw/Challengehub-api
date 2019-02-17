var mongoose = require("mongoose");

var appusersSchema = new mongoose.Schema ({
  name: String,
  deviceId: String
});

module.exports = mongoose.model('Appuser', appusersSchema);






