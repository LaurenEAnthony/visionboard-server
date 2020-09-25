let express = require('express');
let router = express.Router();
let sequilize = require('../db');
const Item = sequilize.import('../models/item.js');


router.get('/practice', 
// valisateSession,
function (req,res) {
    res.send('Hey Item!!!!!')
})

/*
Item:~/api/item  
POST /create      => Creates a new item
PUT /update/:Id   => Updates existing item
DELETE/delete/:id => Delete existing item
GET/mine         => Get all items in the board
*/


//Create Item
router.post('/create', function (req, res) {
    const itemEntry = {
        // owner: req.user.id,
        // boardId: req.board.id,
        itemTitle: req.body.item.itemTitle,
        notes: req.body.item.notes,
        photo: req.body.item.photo,
        dateCreated: req.body.item.dateCreated,
    }
   Item.create(itemEntry)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

//Update item ?????
router.put('/update/:entryId', function (req, res) {
    const updateItemEntry = {
        itemTitle: req.body.item.itemTitle,
        notes: req.body.item.notes,
        photo: req.body.item.photo,
        dateCreated: req.body.item.dateCreated,
    };

    const query = { where: {id: req.params.entryId, owner: req.user.id, board: req.board.id}}; 
    ///board: req.board.id added

   Item.update(updateItemEntry, query)
    .then((item) => res.status(200).json(item))
    .catch((err) => res.status(500).json({error:  err}));
});

//Delete Item ?????????
router.delete('/delete/:id', function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id, board: req.board.id }};
    ///board: req.board.id added

  Item.destroy(query)
    .then(() => res.status(200).json({ message: "This item has been removed"  }))
    .catch((err) => res.status(500).json({ error: err } ));
});

//Get all items for a particular board   ????????
router.get('/mine', (req, res) => {
    let boardid = req.board.id
    Item.findAll({
        where: {board: boardid}
    })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).json({error: err}))
});

//     let userid = req.user.id
//     Board.findAll({
//         where: {owner: userid}

module.exports = router;