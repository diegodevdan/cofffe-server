const Role = require("../models/rol");
const User = require("../models/user");

const isValidRol = async (rol = '') => {
    const existsRole = await Role.findOne({rol})
    if(!existsRole){
        throw new Error(`The role ${rol} is not in the database`)
    }
}

const emailExists = async (email = '') => {
    const existsEmail = await User.findOne({email})
    if(existsEmail){
        throw new Error('The email is already registered')
    }
}

const userExists = async (id = '') => {
    const existsUser = await User.findById(id)
    if(!existsUser){
        throw new Error('The id doesnt exists')
    }
}


module.exports = {
    isValidRol,
    emailExists,
    userExists
}