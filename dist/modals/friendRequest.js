"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequest = void 0;
const mongoose_1 = require("mongoose");
const friendRequestSchema = new mongoose_1.Schema({
    requestedBy: {
        type: String,
        required: true,
        ref: "User"
    },
    requestedTo: {
        type: String,
        required: true,
        ref: "User"
    },
    requestStatus: {
        type: Number,
        default: 0
        // 0,1,2 -> requested , accepted , declined
    }
});
exports.FriendRequest = (0, mongoose_1.model)("FriendRequest", friendRequestSchema);
