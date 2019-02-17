var express = require("express");
var router  = express.Router();
var Appuser = require("../models/appuser");

//INDEX - show all appusers
router.get("/", function(req, res){
    // Get all appusers from DB
    var returnAppusers = [];
    Appuser.find(function(err, allAppusers){
        if(err){
            console.log(err);
        } else {
            console.log("appusers");
            console.log(allAppusers);
            allAppusers.forEach((appuser) => {
                returnAppusers.push({ id: appuser._id, name: appuser.name, deviceId: appuser.deviceId });
            });
        }
    }).exec(() => {
        console.log("returned");
        console.log(returnAppusers);
        res.json({returnAppusers});
    });
});

//CREATE - add new appuser to DB
router.post("/", function(req, res){
    var name = req.body.name;
    var deviceId = req.body.deviceId;
    var newAppuser = { name: name, deviceId: deviceId };
    // Create a new appuser and save to DB
    
    Appuser.create(newAppuser, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
        }
    });
    res.end();
});

router.get("/:id", (req, res) => {
    var selectedAppuser;
    console.log(req.params.id);
    Appuser.find({deviceId: req.params.id}, (err, nowUser) => {
        if(err) {
            console.log(err);
        } else {
            selectedAppuser = nowUser;
            console.log(nowUser);
        }
    }).exec(() => {
        res.json({ selectedAppuser });
    });
});

module.exports = router;

