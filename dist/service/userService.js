"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserService = exports.createUserService = void 0;
const user_1 = __importDefault(require("../modals/user"));
const createUserService = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await user_1.default.create({ email, password });
        return res.status(201).send(result);
    }
    catch (error) {
        next(error);
    }
};
exports.createUserService = createUserService;
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
