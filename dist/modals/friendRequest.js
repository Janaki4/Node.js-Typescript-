"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequest = void 0;
const mongoose_1 = require("mongoose");
const friendRequestSchema = new mongoose_1.Schema({
    requestedUser: {
        type: String,
        required: true,
        ref: "User"
    },
    recipientUser: {
        type: String,
        required: true,
        ref: "User"
    },
    requestStatus: {
        type: Number,
        default: 0
        // 0,1,2 -> requested , accepted , rejected
    }
});
exports.FriendRequest = (0, mongoose_1.model)("FriendRequest", friendRequestSchema);
