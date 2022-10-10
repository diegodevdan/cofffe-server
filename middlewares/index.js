const validateFields = require('../middlewares/valite-fields');
const validateJwt = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");

module.exports = {
    ...validateFields,
    ...validateJwt,
    ...validateRoles
}