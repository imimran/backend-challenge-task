const {Actor, validate} = require('../models/actors');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/', async(req, res)=>{
   const actors = await Actor.find({}, { _id:0, __v:0 }).sort('name');
   res.send(actors);
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let actor = new Actor({
        name: req.body.name,
        birthday: req.body.birthday,
        country: req.body.country
    });
    actor = await actor.save();
    res.send(_.pick(actor,
       [ 
        'name',
        'birthday',
        'country'
    ]
    ));
});

module.exports = router;