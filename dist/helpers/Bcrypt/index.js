"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswordHelper = exports.encryptPasswordHelper = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
const salt = process.env.BCRYPT_SALT;
const encryptPasswordHelper = async (plainPassword) => {
    const encryptedPassword = await bcrypt_1.default.hash(plainPassword, +salt);
    return encryptedPassword;
};
exports.encryptPasswordHelper = encryptPasswordHelper;
const comparePasswordHelper = async (plainPassword, encryptedPassword) => {
    return await bcrypt_1.default.compare(plainPassword, encryptedPassword);
};
exports.comparePasswordHelper = comparePasswordHelper;
