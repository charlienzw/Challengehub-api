var express = require("express");
var router  = express.Router();
var Appuser = require("../models/appuser");
var Challenge = require("../models/challenge");
var Promise = require('promise');

//INDEX - show all challenges
router.get("/", function(req, res){
    // Get all challenges from DB
    var returnChallenges = [];
    var promises = [];
    Challenge.find(function(err, allChallenges){
        if(err){
            console.log(err);
        } else {
            console.log("appchallenges");
            console.log(allChallenges);
            
            allChallenges.forEach((challenge) => {
                let warPromise = Appuser.findById(challenge.userId, 'name').exec((err, returnedAppuser) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(returnedAppuser);
                        returnChallenges.push({ id: challenge._id, name: challenge.name, desc: challenge.desc, prize: challenge.prize, userName: returnedAppuser.name, hitCount: challenge.hitCount });
                    }
                });
                promises.push(warPromise);
            });
        }
    }).exec(() => {
        Promise.all(promises).then(() => {
            console.log(returnChallenges);
            res.json(returnChallenges);   
        });
    });
});

//CREATE - add new challenge to DB
router.post("/", function(req, res){
    var name = req.body.name;
    var desc = req.body.desc;
    var prize = req.body.prize;
    var userId = req.body.userId;
    var hitCount = 0;
    var newChallenge = { name: name, desc: desc, prize: prize, userId: userId, hitCount: hitCount };
    // Create a new challenge and save to DB
    Challenge.create(newChallenge, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: 'manzur.saad@gmail.com',
              from: 'no-reply@challengehub.tech',
              subject: 'A new challenge has been posted: ' + newlyCreated.name,
              text: newlyCreated.desc,
              html: '<strong>https://challengehub.tech/challenges/' + newlyCreated._id + '</strong>',
              categories: newlyCreated._id
            };
            sgMail.send(msg);
        }
    });
    res.end();
});

module.exports = router;

