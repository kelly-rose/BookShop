/**
 * Created by siri on 2017-06-10.
 */
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

//For local strategy
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions={usernameField :'email'};
const localLogin = new LocalStrategy(localOptions,function (email,password, done) {
    //Verify this email and password, call done with the user
    //if it is the correct email and password
    //otherwise, call done with false
    User.findOne({email:email},function (err,user) {
        if(err){return done(err);}
        if(!user){return done(null,false);}

        //compare password - is `password` equal to user.password?
        user.comparePassword(password,function (err,isMatch) {
            if(err){return done(err);}
            if(!isMatch){return done(null,false);}

            return done(null,user);
        });
    });
});

passport.use(localLogin);