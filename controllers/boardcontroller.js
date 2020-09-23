let express = require('express');
let router = express.Router();
let sequilize = require('../db');
let Boards = sequilize.import('../models/board.js');


router.get('/practice', function(req,res) {
    res.send('Hey Board');
})

module.exports = router;