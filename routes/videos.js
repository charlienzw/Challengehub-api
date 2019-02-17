var express = require("express");
var router  = express.Router();
var Video = require("../models/video");
var Appuser = require("../models/appuser");




//CREATE - add new video to DB
router.post("/", function(req, res){
    var name = req.body.name;
    var liveStream = req.body.liveStream;
    var challengeId = req.body.challengeId;
    var viewedTime = 0;
    var likeCount = 0;
    var userId = req.body.userId;
    var newVideo = { userId: userId, name: name, liveStream: liveStream, challengeId: challengeId, viewedTime: viewedTime, likeCount: likeCount };
    Video.create(newVideo, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
        }
    });
    res.end();
});

router.get("/:id", function(req, res){
    var selectedVideos = [];
    Video.find({challengeId: req.params.id}, function(err, selectedVideo) {
       if(err) {
           console.log(err);
       } else {
           selectedVideos.push(selectedVideo);
       }
    }).exec(() => {
        res.json({ selectedVideos });
    });
});

router.get("/getVideoByName/:id", function(req, res){
    var selectedVideos = [];
    Video.find({name: req.params.id}, function(err, selectedVideo) {
       if(err) {
           console.log(err);
       } else {
           selectedVideos.push(selectedVideo);
       }
    }).exec(() => {
        res.json({ selectedVideos });
    });
});

module.exports = router;

