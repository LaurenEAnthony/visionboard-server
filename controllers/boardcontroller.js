let express = require('express');
const board = require('../models/board');
let router = express.Router();
// let sequilize = require('../db');
// const Board = sequilize.import('../models/board.js');
const Board = require('../db').import('../models/board');

// let validateSession = require('../middleware/validate-session');


router.post('/practice',
// valisateSession,
function(req,res) {
    res.send('Hey Board');
})

/*
Board: ~/api/board
POST /create       => Creates a new board
PUT /update/:Id    => Updates existing board
DELETE/delete/:id  => Delete existing board
GET/mine           => Find all my boards
GET/shared         => Get boards that other users have shared
*/


//Create Board
router.post('/create', function (req, res) {
    const boardEntry = {
        // owner: req.user.id,
        boardTitle: req.body.board.boardTitle,
        description: req.body.board.description,
        dateCreated: req.body.board.dateCreated,
        tags: req.body.board.tags,
        sharedBoard: req.body.board.sharedBoard
    }
    Board.create(boardEntry)
    .then(board => res.status(200).json(board))
    .catch(err => res.status(500).json({error: err}))
});

// //Update board
router.put('/update/:entryId', function (req, res) {
    const updateBoardEntry = {
        boardTitle: req.body.board.boardTitle,
        description: req.body.board.description,
        dateCreated: req.body.board.dateCreated,
        tags: req.body.board.tags,
        sharedBoard: req.body.board.sharedBoard
    };

    const query = { where: {id: req.params.entryId, owner: req.user.id}};

    Board.update(updateBoardEntry, query)
    .then((boards) => res.status(200).json(boards))
    .catch((err) => res.status(500).json({error:  err}));
});

//Delete Board
router.delete('/delete/:id', function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id }};

   Board.destroy(query)
    .then(() => res.status(200).json({ message: "This board has been removed"  }))
    .catch((err) => res.status(500).json({ error: err } ));
});

//Get all boards for individual user
router.get('/mine', (req, res) => {
    let userid = req.user.id
    Board.findAll({
        where: {owner: userid}
    })
    .then(board => res.status(200).json(board))
    .catch(err => res.status(500).json({error: err}))
});

//Get shared boards 
router.get('/shared', (req, res) => {
    // let shared = req.params.shared;

    Board.findAll({
        where: {sharedBoard: true, owner: req.user.id}
    })
    .then(board => res.status(200).json(board))
    .catch(err => res.status(500).json({error: err}))
    //res.send("It worked")
});


module.exports = router;
