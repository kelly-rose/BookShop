"use strict"
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // const {Schema} = mongoose;

const booksSchema = new Schema({
    title:String,
    description:String,
    image:String,
    price:Number
});

//Create the model class
const Book=mongoose.model('book',booksSchema);


// Export the model
module.exports=Book;