"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
// userSchema.pre("save", async function (next) {
//   let data = this as IUser;
//   if (data.isModified("password")) {
//     data.password = await bcrypt.hash(data.password, 10);
//   }
//   next();
// });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
