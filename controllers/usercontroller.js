const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validate-session");

// ***LOGIN***
router.post("/login", function (req, res) {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.password, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign(
              { id: user.id, isAdmin: user.isAdmin },
              process.env.JWT_SECRET,
              {
                expiresIn: 60 * 60 * 24,
              }
            );
            res.status(200).json({
              user: user,
              message: "User successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Login Failed" });
          }
        });
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// ***REGULAR USER SIGNUP***
router.post("/signup", function (req, res) {
  User.create({
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
    colorScheme: 0,
    isAdmin: false,
  })
    .then(function createSuccess(user) {
      let token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );

      res.json({
        user: user,
        message: "User successfully created!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// ***ADMIN USER SIGNUP***
router.post("/admin/signup", validateSession, function (req, res) {
  const admin = req.user.isAdmin;
  if (admin == true) {
    User.create({
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email,
      password: bcrypt.hashSync(req.body.user.password, 13),
      colorScheme: 0,
      isAdmin: true,
    })
      .then(function createSuccess(user) {
        let token = jwt.sign(
          { id: user.id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          {
            expiresIn: 60 * 60 * 24,
          }
        );

        res.json({
          user: user,
          message: "Admin successfully created!",
          sessionToken: token,
        });
      })
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(500).json({ error: "Not Authorized" });
  }
});

// ***ADMIN VIEW USER DATA***
router.get("/admin/view-all", validateSession, function (req, res) {
  const admin = req.user.isAdmin;
  if (admin == true) {
    User.findAll()
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(502).json({ error: "Not Authorized" });
  }
});

// ***ADMIN EDIT USER DATA***
router.put("/admin/:userId", validateSession, function (req, res) {
  const admin = req.user.isAdmin;
  if (admin == true) {
    const updateUser = {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email,
      password: bcrypt.hashSync(req.body.user.password, 13),
      isAdmin: req.body.user.isAdmin,
    };

    const query = { where: { id: req.params.userId } };

    User.update(updateUser, query)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(502).json({ error: "Not Authorized" });
  }
});

module.exports = router;
