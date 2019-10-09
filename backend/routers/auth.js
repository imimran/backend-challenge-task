const {User} = require('../models/users');
const express = require('express');
const bcrypt = require('bcryptjs')
const Joi = require('joi');
const router = express.Router();

router.post('/', async(req, res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ username: req.body.username})
    if(!user) return res.status(400).send('Invalid username or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password ');

    const token = user.generateToken()
    res.header('auth-token', token).send({token})
});

function validate(req){
    const schema = {
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);

}
module.exports = router;
