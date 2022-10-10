const {request} = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const {generateJwt} = require("../helpers/generate-jwt");

const loginUser = async (req=request,res) => {
    const {email, password} = req.body;
    try {

        //Search user
        const user = await User.findOne({email});
        if(!user){
            return res.status(200).json({
                msg: 'Email or password is not correct - Email'
            })
        }

        //Validate current state
        if(!user.state){
            return res.status(400).json({
                msg: 'The status of the user is not available'
            })
        }

        //Validate Password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'Password is not correct - Password'
            })
        }

        //Generate JWT

        const token = await generateJwt(user.id)

        res.status(200).json({
            msg: 'Login successfully',
            user,
            token
        })

    } catch (e) {
        console.log({e})
        res.status(500).json({
            msg: 'Talk with the admin for this error'
        })
    }

}


module.exports = {
    loginUser
}