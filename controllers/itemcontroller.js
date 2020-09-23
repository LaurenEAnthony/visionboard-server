let express = require('express');
let router = express.Router();
let sequilize = require('../db');
let Items = sequilize.import('../models/item.js');


router.get('/practice', function (req,res) {
    res.send('Hey Item!')
})

module.exports = router;