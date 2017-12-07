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
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(tasks);
    });
});

// // get single task
// router.get('/tasks/:id', function(req, res, next) {
//     db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
//         if(err)
//         {
//             res.send(err);
//         }
//         res.json(task);
//     });
// });

// // Post task
// router.post('/task', function(req, res, next) {
//     var task = req.body;
//     if(!task.title || !(task.isDone + ''))
//     {
//         res.status(400);
//         res.json({
//             "error": "Bad data"
//         });

//     } else {
//         db.tasks.save(task, function(err, task){
//             if(err)
//             {
//                 res.send(err);
//             }
//             res.json(task);
//         });
//     }
// });

// // delete task
// router.delete('/tasks/:id', function(req, res, next) {
//     db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
//         if(err)
//         {
//             res.send(err);
//         }
//         res.json(task);
//     });
// });

// // update task
// router.put('/tasks/:id', function(req, res, next) {
    
//     var task = req.body;
//     var updTask = {};

//     if(task.isDone)
//     {
//         updTask.isDone = task.isDone;
//     }

//     if(task.title)
//     {
//         updTask.title = task.title;
//     }

//     if(!updTask)
//     {
//         res.status(400);
//         res.json({
//             "error":"Bad data"
//         });
//     }
//     else
//     {
//         db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task) {
//             if(err)
//             {
//                 res.send(err);
//             }
//             res.json(task);
//         });
//     }
//});

module.exports = router;