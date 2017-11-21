const express = require('express');
const router = new express.Router();
var Purchase = require('./../models/Purchase');

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const Mailer = require('../services/Mailer');
const billingTemplate = require('../services/emailTemplates/confirmTemplate');

const passportService2 = require('./../services/passport-jwt');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{session:false});

router.post('/stripe',requireAuth, async (req, res) => {
    const {addrInfo, cart, totalAmount, email} = req.body;
    // console.log("======user==========");
    // console.log(req.user);
    // console.log("======req.body==========");
    // console.log(req.body);
    // console.log(typeof totalAmount);
    // const charge =
    await stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        source: req.body.id
    });

    const purchase = new Purchase({
         _user: req.user._id,
        product: cart,
        currency: 'usd',
        totalAmount: totalAmount,
        cardType: req.body.card.brand,
        shippingAddress: addrInfo,
        billingEmail: email.trim()
    });

    await purchase.save();    //save DB
    console.log('save DB Pur');

    //Great place to send an email
    const mailer = new Mailer(purchase,billingTemplate(purchase));
    mailer.send();

    // console.log(charge);


    res.clearCookie('rose');
    req.session.destroy();

    res.send({success: true});

});
module.exports = router;
