const {response} = require("express");
const {isValidRol} = require("../helpers/db-validators");

const isAdminRole = (req,res,next) => {
    if(!req.user){
        return res.status(500).json({
            msg:'The role verification is without token'
        })
    }


    const {rol, name} = req.user;
    console.log({rol})
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `the user ${name} can't do this, must be admin`
        })
    }

    next();
}

const hasRole = (...roles) => {
    return async (req,res=response,next) => {
        if(!req.user){
            return res.status(500).json({
                msg:'The role verification is without token'
            })
        }

        if(!roles.includes(req.user.rol)){
            return res.status(500).json({
                msg:'The role is not valid'
            })
        }

        next();
    }
}


module.exports = {
    isAdminRole,
    hasRole
}