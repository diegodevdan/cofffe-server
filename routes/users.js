const {validateFields} = require('../middlewares/valite-fields');
const {isValidRol, emailExists, userExists} = require('../helpers/db-validators')
const {Router} = require('express');
const router = Router();
const {body, check} = require('express-validator');
const {deleteUser, updateUser, getUsers, createUser, getUser} = require('../controllers/users');

router.post('/', [
    body('name')
        .isLength({min: 10})
        .notEmpty()
        .withMessage('The name is at least 10 characters'),
    check('email')
        .isEmail()
        .custom(emailExists),
    body('password')
        .notEmpty()
        .isLength({min: 5})
        .withMessage('Password must be at least 5 characters'),
    // body('rol', 'Is not a valid rol')
    //     .isIn(['USER', 'ADMIN']),
    body('rol').custom(isValidRol),
    validateFields,
], createUser);

router.put('/:id', [
    check('id', 'Need to be a valid Id')
        .isMongoId(),
    check('id')
        .custom(userExists),
    check('rol')
        .custom(isValidRol),
    validateFields,
], updateUser)


router.get('/', [], getUsers)

router.get('/:id', [
    check('id')
        .isMongoId(),
    check('id')
        .custom(userExists),
    validateFields
], getUser)

router.delete('/:id',[
    check('id', 'Need to be a valid Id')
        .isMongoId(),
    check('id')
        .custom(userExists),
    validateFields,
], deleteUser)

module.exports = router;