const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Authentication Failed. No token provided')

    try{
        const decoded = jwt.verify(token, 'jwtPrivateKey')
        req.user = decoded;
        next();
    }

    catch(ex){
         res.status(400).send('Invalid Token')
    }
};

module.exports = auth ;
