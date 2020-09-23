let router = require("express").Router();
let Relationship = require("../db").import("../models/relationship");

router.get("/relationships", function (req, res) {
  res.send("shared/relationships route");
});

router.get("/boards", function (req, res) {
  res.send("shared/boards route");
});

router.get("/:boardId", function (req, res) {
  res.send("shared/:boardId route");
});

router.post("/relationships/add", function (req, res) {
  Relationship.create({
    user_1: req.user.id,
    user_2: req.body.user_2,
  })
    .then(function createSuccess(user_2) {
      if (user_2) {
        res.status(200).json({
          user_2: user_2,
        });
      } else {
        res.status(500).json({ error: "Other user does not exist" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("relationships/delete", function (req, res) {
  res.send("shared/relationships/delete route");
});

module.exports = router;
