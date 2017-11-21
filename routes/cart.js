/**
 * Created by siri on 2017-06-28.
 */
var express = require('express');
var router = express.Router();

// SAVE SESSION CART API
router.post('/', function(req, res){
    var cart = req.body;
    // console.log(cart);
    // console.log('req.session.cart : ');
    // console.log(req.session.cart);

    req.session.cart = cart;
    req.session.save(function(err){
        if(err){
            throw err;
        }
       return  res.json(req.session.cart);
    })
});

// GET SESSION CART API
router.get('/', function(req, res){
    if(typeof req.session.cart !== 'undefined'){
        console.log(req.session.cart);
        return  res.json(req.session.cart);
    }
});

module.exports = router;
