const {User, validate} = require('../models/users');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username});
     if(user) return res.status(400).send('User Already Registered');

    user = new User({
        username: req.body.username,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    user = await user.save();
    const token = user.generateToken()
    res.header('auth-token', token).send({token})

});

module.exports = router
