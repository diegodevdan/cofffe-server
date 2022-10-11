const router = require('express').Router();
const {check} = require("express-validator");
const {
    validateFields,
    validateJwt,
    isAdminRole
} = require('../middlewares/')
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories')
const {categoryExists} = require("../helpers/db-validators");


router.get('/', [
    validateJwt,
    validateFields
], getCategories)

router.get('/:id', [
    validateJwt,
    check('id', 'The id must be a mongoId')
        .isMongoId(),
    check('id')
        .custom(categoryExists),
    validateFields
], getCategory)

router.post('/', [
    validateJwt,
    check('name', 'The category name is required')
        .notEmpty()
        .isLength({min:4, max:20}),
    validateFields
], createCategory)

router.put('/:id', [
    validateJwt,
    check('id')
        .isMongoId(),
    check('name', 'The name is required')
        .notEmpty(),
    check('id')
        .custom(categoryExists),
    validateFields
], updateCategory)

router.delete('/:id', [
    validateJwt,
    isAdminRole,
    check('id')
        .isMongoId(),
    check('id')
        .custom(categoryExists),
    validateFields
], deleteCategory)


module.exports = router;