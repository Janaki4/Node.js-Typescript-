"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailValidator = exports.getUserValidator = exports.userLogInValidator = exports.userSignUpValidator = void 0;
const zod_1 = require("zod");
//public
exports.userSignUpValidator = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "email is required", }).email({ message: 'Must be a valid email' }),
        password: zod_1.z.string({ required_error: "password is required", }),
        name: zod_1.z.string({ required_error: "name is required" })
    }),
});
exports.userLogInValidator = zod_1.z.object({
    body: zod_1.z.object({
        emailId: zod_1.z.string({ required_error: "email is required", }).email({ message: 'Must be a valid email' }),
        password: zod_1.z.string({ required_error: "password is required", }),
    })
});
exports.getUserValidator = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "id is reauired" })
    })
});
exports.verifyEmailValidator = zod_1.z.object({
    params: zod_1.z.object({
        token: zod_1.z.string()
    })
});
// private
// export const friendRequestActionValidator = z.object({
//   params: z.object({
//     recipientid: z.string({required_error:"id is reauired"}),
//     actiontype:z.string({required_error:"action is required"})
//   })
// })
// export const sendFriendRequestValidator = z.object({
//   params: z.object({
//     recipientid: z.string({required_error:"id is reauired"})
//   })
// })
