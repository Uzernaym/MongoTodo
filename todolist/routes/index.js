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
        console.log(collection)
    });
});


module.exports = router;
