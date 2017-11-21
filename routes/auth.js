/**
 * Created by siri on 2017-06-28.
 */
/**
 * Created by siri on 2017-06-10.
 */
const express = require('express');
const router = new express.Router();

const Authentication = require('./../controllers/authentication');
const passportService1 = require('./../services/passport-local');
const passportService2 = require('./../services/passport-jwt');
const passportService3 = require('./../services/passport-google');

const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin= passport.authenticate('local',{session:false});

// router.get('/', function (req, res) {
//         res.send({message:'Super secret code is ABC123'});
//     });

// token이 있을 때 아래 message를 보여줌.
// router.get('/', requireAuth, function (req, res) {
//     res.send({message:'Super secret code is ABC123'});
// });
router.get('/api/socialLogin',Authentication.signin);


router.post('/api/signin', requireSignin, Authentication.signin);

router.post('/api/signup', Authentication.signup);

router.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    },()=>{
    console.log('gooooogllllelelee')
    })
);

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});


router.get('/api/logout', (req, res) => {
    console.log('logout'+req.user);
    res.clearCookie('rose');
    req.session.destroy();
    res.redirect('/');

    // res.send(req.user);

});

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
    // res.send(req.session.user);
});


module.exports = router;
