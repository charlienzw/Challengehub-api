var express = require("express");
var router  = express.Router();
var Challenge = require("../models/challenge");

router.post("/", function(req, res){
    console.log(req.body);
    var challengeId = req.body[0].category[0];
    Challenge.findById(challengeId, 'hitCount', (err, returnedHitCount) => {
        if(err) {
            console.log(err);
        } else {
            console.log(returnedHitCount.hitCount + 1);
            console.log("challengeId: " + challengeId);
            Challenge.findByIdAndUpdate(challengeId, { hitCount: returnedHitCount.hitCount + 1 }, {new: true}, (err, returnedHitCount) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("returnedHitCount: " + returnedHitCount);
                }
            });
        }
    });
});

module.exports = router;
