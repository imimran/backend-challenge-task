const express = require('express');
const { Movie, validate} = require('../models/movies');
const { Actor} = require('../models/actors');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/', auth, async(req, res)=>{
    const movies = await Movie
    .find({}, { _id:0, __v:0 })
    res.send(movies);
});  

router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const actors = await Actor.find(
        { _id: { $in: req.body.actorId } }, 
        { _id: 0, name: 1, birthday: 1, country: 1 } 
      );
    if(!actors) return res.status(400).send('Invalid Actors');

    

    let movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating,
        actors,
      }); 
          
    


    try {
        movie = await movie.save();
        res.send(movie)
      } catch (ex) {
        console.log("Invalid Movie ");
      }
 
});
module.exports =router;