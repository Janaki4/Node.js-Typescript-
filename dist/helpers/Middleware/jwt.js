"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const index_1 = require("../JWT/index");
const index_2 = require("../Responses/index");
const Constants_1 = require("../Constants");
const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const headerToken = req.headers.authorization;
            const token = headerToken.replace("Bearer ", "");
            const decoded = await (0, index_1.verifyJWTHelper)(token);
            req.id = decoded.id;
            req.email = decoded.email;
            req.name = decoded.name;
            next();
        }
        else {
            return res
                .status(400)
                .send((0, index_2.errorResponse)(Constants_1.CONSTANTS.ACCESS_TOKEN_MISSING));
        }
    }
    catch (error) {
        next(error);
    }
};
exports.auth = auth;
