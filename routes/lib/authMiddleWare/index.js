const { checkIsEmpty } = require("../shared/checkIsEmpty");
const { checkIsUndefined } = require("../shared/checkIsUndefined");
const { validateCreateData } = require("./authCreateMiddleWare/validateCreateData");
const { validateLoginData } = require("./authLoginMiddleware/validateLoginData");
const { validateUpdateData } = require("./validateUpdateData/validateUpdateData");

module.exports = {
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    validateLoginData,
    validateUpdateData
}