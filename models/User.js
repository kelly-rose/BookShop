/**
 * Created by siri on 2017-06-10.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model
const userSchema = new Schema({
    //lowercase : true면 대소문자 구별안하겠다.
    // email: {type:String, unique:true, lowercase:false},
    email: {type:String, lowercase:false},
    password: String,
    googleId:String
});


//On Save Hook, encrypt password
//Before saving a model, run this function
userSchema.pre('save',function (next) {
    //get access to the user model
    console.log('pre save', this);
    const user=this;

    //generate a salt then run callback
    bcrypt.genSalt(10,function (err,salt) {
        if(err){
            return next(err);
        }

        //hash (encrypt) our password using the salt
        bcrypt.hash(user.password,salt,null,function (err,hash) {
            if(err){
                return next(err);
            }

            //overwrite plain text password with encrypted password
            user.password=hash;
            next();
        });
    });
});


userSchema.methods.comparePassword=function (candidatePassword,callback) {
    console.log('comparePassword의 this.password : ',this.password);
    bcrypt.compare(candidatePassword,this.password,function (err,isMatch) {
        if(err){return callback(err);}

        callback(null,isMatch);
    });
}

//Create the model class
const User=mongoose.model('user',userSchema);

// Export the model
module.exports=User;
