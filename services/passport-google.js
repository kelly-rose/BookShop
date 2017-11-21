const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user, done) => {
    console.log("serializeUser=" + user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            console.log("deserializeUser=" + id);
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
        , proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        // console.log('accessToken',accessToken);
        // console.log('refreshToken',refreshToken);
        console.log('profile : ',profile.id);

        const existingUser = await User.findOne({googleId: profile.id});
        if (existingUser) {

            console.log("passport-google existingUser");
            console.log(existingUser);
            //we already have a record with the given profile ID
            return done(null, existingUser);    //section 4 - 38, user를 쿠키에 저장

        }

        //we don't have a user's record with this ID, make a new record
        const user = await new User({googleId: profile.id}).save(); //DB에 user를 저장
        console.log("passport-google");
        console.log(user);

        return done(null, user);   //user를 쿠키에 저장

    })
);

