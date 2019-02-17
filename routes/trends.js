var express = require("express");
var router  = express.Router();
var Trend = require("../models/trend");
var Video = require("../models/video");

//CREATE - add new challenge to DB
router.post("/", function(req, res){
    var userId = req.body.userId;
    var videoId = req.body.videoId;
    var hasLiked = 1;
    var newTrend = { userId: userId, videoId: videoId, hasLiked: hasLiked };
    // Create a new challenge and save to DB
    Trend.create(newTrend, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            Video.findById(newlyCreated.videoId, 'likeCount', (err, returnedLikeCount) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(returnedLikeCount.likeCount + 1);
                    console.log("videoId: " + newlyCreated.videoId);
                    Video.findByIdAndUpdate(newlyCreated.videoId, { likeCount: returnedLikeCount.likeCount + 1 }, {new: true}, (err, returnedLikeCount) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("returnedLikeCount: " + returnedLikeCount);
                        }
                    });
                }
            });
        }
    });
    res.end();
});

module.exports = router;

