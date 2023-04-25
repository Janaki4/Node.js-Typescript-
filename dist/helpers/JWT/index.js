"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTHelper = exports.createJWTToken = void 0;
const jwt = require("jsonwebtoken");
require("dotenv").config();
async function createJWTToken(data) {
    const token = await jwt.sign({ id: data._id, name: data.name, email: data.email }, process.env.JWT_SECRET_KEY);
    return Promise.resolve(token);
}
exports.createJWTToken = createJWTToken;
async function verifyJWTHelper(token) {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
}
exports.verifyJWTHelper = verifyJWTHelper;
