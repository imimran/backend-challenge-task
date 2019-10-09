const Joi = require('joi');
const mongoose = require('mongoose');


const actorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 5,
        max:50
    },
    birthday:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    }
   
 
});

const Actor = new mongoose.model('Actor', actorSchema);

function validateActor(actor){
    const schema ={
        name: Joi.string().min(5).max(50).required(),
        birthday: Joi.string().required(),
        country: Joi.string().required()
    };
    return Joi.validate(actor, schema);
};

module.exports.Actor = Actor;
module.exports.validate = validateActor;
module.exports.actorSchema = actorSchema;
