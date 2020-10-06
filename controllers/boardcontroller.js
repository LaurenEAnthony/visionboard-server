let express = require("express");
let router = express.Router();
const Board = require("../db").import("../models/board");
const Item = require("../db").import("../models/item");

//Create Board OK :)

router.post("/create", function (req, res) {
  const boardEntry = {
    owner: req.user.id,
    boardTitle: req.body.board.boardTitle,
    description: req.body.board.description,
    dateCreated: req.body.board.dateCreated,
    tags: req.body.board.tags,
    sharedBoard: req.body.board.sharedBoard,
  };
  Board.create(boardEntry)
    .then((board) => res.status(200).json(board))
    .catch((err) => res.status(500).json({ error: err }));
});

// Update board  OK :)
router.put("/update/:entryId", function (req, res) {
  const updateBoardEntry = {
    boardTitle: req.body.board.boardTitle,
    description: req.body.board.description,
    dateCreated: req.body.board.dateCreated,
    tags: req.body.board.tags,
    sharedBoard: req.body.board.sharedBoard,
  };

  const query = { where: { id: req.params.entryId, owner: req.user.id } };

  Board.update(updateBoardEntry, query)
    .then((boards) => res.status(200).json(boards))
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete Board  OK :)
router.delete("/delete/:id", function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Board.destroy(query)
    .then(() =>
      res.status(200).json({ message: "This board has been removed" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

//Get all boards for individual user  OK :)
router.get("/mine", (req, res) => {
  let userid = req.user.id;
  Board.findAll({
    where: { owner: userid },
  })
    .then((board) => res.status(200).json(board))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get all items for a particular board   OK :)
router.get("/:board", (req, res) => {
  let board = req.params.board;
  Item.findAll({
    where: { boardId: board },
  })
    .then((item) => res.status(200).json(item))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get shared boards
router.get("/shared", (req, res) => {
  // let shared = req.params.shared;

  Board.findAll({
    where: { sharedBoard: true, owner: req.user.id },
  })
    .then((board) => res.status(200).json(board))
    .catch((err) => res.status(500).json({ error: err }));
  //res.send("It worked")
});

module.exports = router;
