var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://jholmes:db123@ds113936.mlab.com:13936/jholmes', ['highscores']);

// get all scores
router.get('/highscores', function(req, res, next) {
    console.log("getting");
    db.highscores.find(function(err, highscores) {
        if(err)
        {
            res.send(err);
        }
        res.json(highscores);
    });
});

// Post highscore
router.post('/highscores', function(req, res, next) {
    console.log("posting");
    var score = req.body;
    if(!score.name || !(score.score ))
    {
        res.status(400);
        res.json({
            "error": "Bad data"
        });

    } else {
        db.highscores.save(score, function(err, score){
            if(err)
            {
                res.send(err);
            }
            res.json(score);
        });
    }
});

module.exports = router;