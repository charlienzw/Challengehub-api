var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    Appuser     = require("./models/appuser"),
    Challenge   = require("./models/challenge"),
    Video       = require("./models/video"),
    Trend       = require("./models/trend");

var url = process.env.DATABASEURL || "mongodb://localhost/live_db";
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
//app.use('/admin', express.static('./node_modules/admin-lte-express/public'));
//app.use('/', require('admin-lte-express'));
app.use('/appusers', require("./routes/appusers"));
app.use('/challenges', require("./routes/challenges"));
app.use('/trends', require("./routes/trends"));
app.use('/videos', require("./routes/videos"));
app.use('/emailevent', require("./routes/emailevent"));



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});
