var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://jholmes:db123@ds113936.mlab.com:13936/jholmes', ['tasks']);

// get all handles
router.get('/tasks', function (req, res, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});


// Post handle
router.post('/tasks', function (req, res, next) {

    var handle = req.body;
    if (!handle.handle || !(handle.state)) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });

    } else {
        db.tasks.save(handle, function (err, handle) {
            if (err) {
                res.send(err);
            }
            res.json(handle);
        });
    }
});

// delete handle 
router.delete('/tasks/:id', function(req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id)}, function(err, task) {
        if(err) {
            console.log("cant find");
            res.send(err);
        }
        res.json(task);
        console.log(task);
    });
});



module.exports = router;