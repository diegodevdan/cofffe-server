const router = require('express').Router();
const {
    loginUser
} = require('../controllers/auth')
const {validateFields} = require("../middlewares/valite-fields");
const {check} = require("express-validator");


router.post('/login', [
    check('email', 'The email is required')
        .isEmail(),
    check('password', 'The password is required')
        .not()
        .isEmpty(),
    validateFields
], loginUser)


module.exports = router;