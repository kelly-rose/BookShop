const jwt=require('jwt-simple');

var User = require('./../models/User');

const keys = require('../config/keys');

//create jwt
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    if(!user){
        return;
    }
    console.log('user: ' , user);
    console.log('user.id : ' , user.id);

    return jwt.encode({sub:user.id, iat:timestamp},keys.secret);
}

exports.signup = function (req, res, next) {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({error: 'You must provide email and password'});
    }


    //See if a user with the given email exists
    User.findOne({email: email}, function (err, existingUser) {

        if (err) {
            return next(err);
        }

        //If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }

        //If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(function (err) {
            if (err) {
                return next(err);
            }

            //Respond to request indicating the user was created
            res.json({token:tokenForUser(user)});
            // res.json({success: true});
            // res.json(user);
        });
    });
}


exports.signin = function (req, res, next) {
   //User has already had their email and password auth'd
    //We just need to give them a token
    res.json({token:tokenForUser(req.user)});
}

