const router = require('express').Router();
const Admin = require('../db').import('../models/admin');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

router.post('/admin', function(req, res) {

    Admin.create({
        email: req.body.admin.email,
        passwordhash: bcrypt.hashSync(req.body.admin.passwordhash, 13)
    })
    .then(
        function createSuccess(admin) {
            let token = jwt.sign({id: admin.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.json({
                admin: admin,
                message: 'Admin successfully created!',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }))
});

router.post('/login', function(req, res) {
    Admin.findOne({
        where: {
            email:req.body.admin.email   
        }
    })
    .then(function loginSuccess(user) {
        if (admin) {
            bcrypt.compare(req.body.admin.passwordhash, admin.passwordhash, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({id: admin.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                    res.status(200).json({
                        admin: admin,
                        message: 'Admin successfully logged in!',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: "Login Failed" });
                }
            });

        } else {
            res.status(500).json({ error: 'Admin does not exist.' })
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;   