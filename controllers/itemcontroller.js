let express = require("express");
let router = express.Router();

const Item = require("../db").import("../models/item.js");

//Create Item
router.post("/create-new-on-board/:boardId", function (req, res) {
  const itemEntry = {

    boardId: req.params.boardId,
    itemTitle: req.body.item.itemTitle,
    notes: req.body.item.notes,
    photo: req.body.item.photo,
  };
  Item.create(itemEntry)
    .then((item) => res.status(200).json(item))
    .catch((err) => res.status(500).json({ error: err }));
});

//Update item
router.put("/update/:itemId", function (req, res) {
  const updateItemEntry = {
    itemTitle: req.body.item.itemTitle,
    notes: req.body.item.notes,
    photo: req.body.item.photo,
  };

  const query = { where: { id: req.params.itemId } };

  Item.update(updateItemEntry, query)
    .then((item) => res.status(200).json(item))
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete Item
router.delete("/delete/:itemId", function (req, res) {
  const query = { where: { id: req.params.itemId } };

  Item.destroy(query)
    .then(() => res.status(200).json({ message: "This item has been removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
