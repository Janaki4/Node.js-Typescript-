"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
userSchema.pre("save", async function (next) {
    let data = this;
    if (data.isModified("password")) {
        data.password = await bcrypt_1.default.hash(data.password, 10);
    }
    next();
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
