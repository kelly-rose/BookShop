const express = require('express');
const router = new express.Router();

const passport = require('passport');

var Purchase = require('./../models/Purchase');

const requireAuth = passport.authenticate('jwt', {session: false});

router.get('/', requireAuth, function (req, res) {

    console.log(req.user);

    Purchase.find({_user: req.user._id})
        .sort({purchaseDate: -1}).exec((err, purchases)=> {
            if (err) {
                throw err;
            }
            res.json(purchases);
        })
});

module.exports = router;
