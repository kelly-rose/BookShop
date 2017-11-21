const express = require('express');
const auth = require('./auth');
const book = require('./book');
const cart = require('./cart');
const billing = require('./billing');
const invoice = require('./invoice');

const router = express.Router();


router.use('/', auth);
router.use('/api/book', book);
router.use('/api/cart', cart);
router.use('/api/billing', billing);
router.use('/api/invoice', invoice);


module.exports = router;
