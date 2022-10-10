const User = require('../models/user');
const bcrypt = require('bcryptjs');
const hashPassword = require('../helpers/hash-password');
const {dbDisconnect, dbConnection} = require("../database/config");

const getUsers = async (req, res) => {
    const {page, limit} = req.query;
    const query = {state: true};
    try {
        // const users = await User.find(query)
        //     .limit(limit)
        //     .skip(page)
        //     .exec();
        //
        // const usersAmount = await User.countDocuments(query)

        //Better perforance and you wrap two querys in one promise
        const [users,usersAmount] = await Promise.all([
            User.find(query)
                .limit(limit)
                .skip(page)
                .exec(),
            User.countDocuments(query)
        ])

        res.status(200).json({
            msg: 'success',
            usersAmount,
            users,
        })
    } catch (e) {
        res.status(400).json({
            msg: e,
        })
    }
}

const getUser = async (req, res) => {
    const {id} = req.params;

    try {

        const user = await User.findById(id);
        res.status(200).json({
            msg: 'Successfully',
            user
        })

    } catch (e) {
        res.status(400).json({
            msg: e,
        })
    }

}

const createUser = async (req, res) => {

    const {name, email, password, rol, ...rest} = req.body;

    const user = new User({
        name,
        email,
        password,
        rol,
        ...rest
    })

    user.password = hashPassword(password);

    try {
        await dbConnection();
        await user.save();
        //Fix this
        // await dbDisconnect();
    } catch (e) {
        throw new Error(e)
    }


    res.status(200).json({
        msg: 'User created successfully',
        user
    })
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {_id, password, google, ...user} = req.body;

    if (password) {
        user.password = hashPassword(password);
    }

    const userDb = await User.findByIdAndUpdate(id, user)
    console.log({userDb})

    res.status(200).json({
        msg: 'User updates successfully',
        user
    })
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    // const uid = req.uid;
    // console.log(uid)
    // const userAuth = req.user;

    try {
        //findByIdAndDelete delete forever
        // const user = await User.findByIdAndDelete(id);

        const user = await User.findByIdAndUpdate(id, {state: false})

        res.status(200).json({
            msg:'User deleted successfully',
            user,
            // userAuth
        })

    } catch (e) {
        res.status(400).json({
            msg: e,
        })
    }

}


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}