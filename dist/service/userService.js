"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserService = exports.verifyEmail = exports.userLogin = exports.createUserService = void 0;
const user_1 = __importDefault(require("../modals/user"));
const index_1 = require("../helpers/Constants/index");
const Bcrypt_1 = require("../helpers/Bcrypt");
const lodash_1 = __importDefault(require("lodash"));
const index_2 = require("../helpers/JWT/index");
const index_3 = require("../helpers/Mailer/index");
const index_4 = require("../helpers/Responses/index");
const createUserService = async (req, res, next) => {
    try {
        let { email, password, name } = req.body;
        const isUserAlreadyExists = await user_1.default.findOne({ email, isDeleted: false });
        if (isUserAlreadyExists) {
            return res.status(400).send(index_1.CONSTANTS.DUPLICATION);
        }
        password = await (0, Bcrypt_1.encryptPasswordHelper)(password);
        const createdJwt = await (0, index_2.createJWTToken)({ name, email, password });
        const result = await user_1.default.create({
            email,
            password,
            name,
            token: createdJwt,
        });
        if (result) {
            const mailRes = await (0, index_3.confirmationMail)(email, name, "Verify your email address to proceed", result.token);
        }
        return res.status(201).send((0, index_4.successResponse)(result));
    }
    catch (error) {
        next(error);
    }
};
exports.createUserService = createUserService;
const userLogin = async (req, res, next) => {
    try {
        const { emailId, password } = req.body;
        const isUserExists = await user_1.default.findOne({
            email: emailId,
            isDeleted: false,
        });
        if (isUserExists) {
            if (!isUserExists.isEmailVerified) {
                return res.status(400).send(index_1.CONSTANTS.EMAIL_NOT_VERIFIED);
            }
            const isPasswordCorrect = await (0, Bcrypt_1.comparePasswordHelper)(password, isUserExists.password);
            if (isPasswordCorrect) {
                const createdJwt = await (0, index_2.createJWTToken)(isUserExists);
                const { _id, name, email } = lodash_1.default.omit(isUserExists, ["password"]);
                let result = {
                    id: _id,
                    name,
                    email: email,
                    token: createdJwt,
                };
                return res.status(200).send((0, index_4.successResponse)(result));
            }
            else
                return res.status(400).send((0, index_4.errorResponse)(index_1.CONSTANTS.INCORRECT_PASSWORD));
        }
        return res.status(400).send((0, index_4.errorResponse)(index_1.CONSTANTS.USER_NOT_FOUND));
    }
    catch (error) {
        next(error);
    }
};
exports.userLogin = userLogin;
const verifyEmail = async (req, res, next) => {
    try {
        const token = req.params.token;
        const decodedJwt = await (0, index_2.verifyJWTHelper)(token);
        const userDetails = await user_1.default.findOne({
            email: decodedJwt.email,
            isDeleted: false,
        });
        if (userDetails) {
            if (!(userDetails === null || userDetails === void 0 ? void 0 : userDetails.isEmailVerified)) {
                await user_1.default.updateOne({ email: decodedJwt.email }, { isEmailVerified: true });
                return res.status(200).send((0, index_4.successResponse)(index_1.CONSTANTS.EMAIL_VERIFIED));
            }
            return res.status(200).send((0, index_4.successResponse)(index_1.CONSTANTS.EMAIL_ALREADY_VERIFIED));
        }
        else {
            return res.status(400).send((0, index_4.errorResponse)(index_1.CONSTANTS.UNSUCCESS));
        }
    }
    catch (error) {
        next(error);
    }
};
exports.verifyEmail = verifyEmail;
const getUserService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await user_1.default.findById({ _id: id });
        return res.status(201).send(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserService = getUserService;
