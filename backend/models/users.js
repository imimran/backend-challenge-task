const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        min: 5,
        max:50
    },
    password:{
        type: String,
        required: true,
        min: 5,
        max:50
    }
});

userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id: this._id, username: this.username}, 'jwtPrivateKey');
    return token;
}

const User = new mongoose.model('User', userSchema);



function validateUser(user){
    const schema = {
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(user, schema)
};

module.exports.User = User;
module.exports.validate = validateUser;