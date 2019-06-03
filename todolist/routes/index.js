var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET Todolist page. */
router.get('/todolist', function (req, res) {
    var db = req.db;
    var collection = db.get('todocollection');

    collection.find({}, {}, function (e, docs) {
        res.render('todolist', {
            "todolist": docs
        });
    });
});

router.post('/todolist', function (req, res) {
    var db = req.db;
    var collection = db.get('todocollection');

    var todo = req.body.todo;
    var time = req.body.time;

    collection.insert({
        "todo": todo,
        "time": time
    }, function (err, docs) {
        if (err) {
            res.send('Error sending data to db');
        } else {
            res.redirect('/todolist');
        }
    });
});

router.get('/todolist/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('todocollection');

    var todoToDelete = req.params.id;

    collection.remove({
        "_id": todoToDelete
    }, function (err, docs) {
        if (err) {
            res.send('Error deleting data in db');
        } else {
            res.redirect('/todolist');
        }
    });
});

module.exports = router;
