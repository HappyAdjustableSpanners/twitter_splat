var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://jholmes:db123@ds113936.mlab.com:13936/jholmes', ['tasks']);

// get all tasks
router.get('/tasks', function(req, res, next) {
    db.tasks.find(function(err, tasks) {
        if(err)
        {
            res.send(err);
        }
        res.json(tasks);
    });
});
module.exports = router;