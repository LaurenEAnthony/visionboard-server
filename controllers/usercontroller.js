const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validate-session");

// ***LOGIN***  OK :)
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

// ***REGULAR USER SIGNUP***  OK :)
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

// ***USER EDIT COLORSCHEME***
router.put("/colorScheme", validateSession, function (req, res) {
    const updateColorScheme = {
      colorScheme: req.body.user.colorScheme,
    };

    const query = { where: { id: req.user.id } }

    User.update(updateColorScheme, query)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ error: err }));
});

// ***ADMIN USER SIGNUP***  OK :)
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

// ***ADMIN VIEW USER DATA***  OK :)
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

// ***ADMIN EDIT USER DATA***  OK :)
router.put("/admin/edit/:userId", validateSession, function (req, res) {
  const admin = req.user.isAdmin;
  if (admin == true) {
    const updateUser = {
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


// ***ADMIN DELETE USER DATA***
router.delete("/admin/delete/:userId", validateSession, function (req, res){
  const admin = req.user.isAdmin;
  if (admin == true){
    const query = {where: {id: req.params.userId}};

    User.destroy(query)
    .then(()=> res.status(200).json({message: "User Removed"}))
    .catch((err)=> res.status(500).json({error: err}))
  } else {
    res.status(502).json({error: "Not authorized"})
  }
})

module.exports = router;
