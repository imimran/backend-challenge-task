const mongoose = require('mongoose');
const Joi = require('joi');
const actorSchema = require('../models/actors');


const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min: 5,
        max: 50
    },
    year:{
        type: String,
        required: true,
        min:2,
        max:4
},
    rating:{
        type: Number,
        required: true,
        min:0,
        max:10
    },
    actors: {
        type: actorSchema,
        required: true
    }

});

const Movie = new mongoose.model('Movie', movieSchema);

function validateActor(movie){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        year: Joi.string().min(4).max(10).required(),
        rating: Joi.number().min(0).max(10).required(),
        actorId:Joi.required()
    }
    return Joi.validate(movie, schema)
};

module.exports.Movie = Movie;
module.exports.validate = validateActor;
