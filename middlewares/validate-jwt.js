const jwt = require('jsonwebtoken');
const {request} = require('express');
const User = require('../models/user')

const validateJwt = async (req = request,res,next) => {
    const token = req.header('token');
    if(!token){
        return res.status(401).json({
            msg: 'No token in the petition'
        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETKEY);
        req.uid = uid;

        //Get the user own of the uid
        const user = await User.findById(uid);

        //Verify if the user exists
        if(!user){
            return res.status(401).json({
                msg: 'Token not valid - user not in DB'
            })
        }

        //Verify is the uid is state true
        if(!user.state){
            return res.status(401).json({
                msg: 'Token not valid - user with status false'
            })
        }

        req.user = user;
        next();
    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: 'Token not valid'
        })
    }

}


module.exports = {
    validateJwt
}