/**
 * Created by siri on 2017-06-10.
 */
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    console.log('payload : ', payload);
    //See if the user ID in the payload exists in our database
    //If it does, call 'done' with that user
    //otherwise, call done without a user object
    User.findById(payload.sub, function (err, user) {

        //one err is the search failed to occur
        if(err){return done(err,false);}

        if(user){
            done(null,user);
        }else{
            //another err is that doing a search but we couldn't find a user.
            done(null,false);
        }
    });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
