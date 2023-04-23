"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserValidator = exports.createUserValidator = void 0;
const zod_1 = require("zod");
exports.createUserValidator = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "email is required", }),
        password: zod_1.z.string({ required_error: "password is required", }),
    }),
});
exports.getUserValidator = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "id is reauired" })
    })
});
