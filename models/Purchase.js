const mongoose = require('mongoose');
const Schema = mongoose.Schema; // const {Schema} = mongoose;

const purchaseSchema = new Schema({
    purchaseDate:  { type: Date, default: Date.now },
    product: [],
    currency: String,
    totalAmount: String,
    cardType: String,
    shippingAddress : Object,
    billingEmail: String,
    _user : {type:Schema.Types.ObjectId, ref:'User'}
});

//Create the model class
const Purchase=mongoose.model('purchase',purchaseSchema);


// Export the model
module.exports=Purchase;
