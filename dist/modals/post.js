"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    isImageAvailable: {
        type: Boolean,
        default: false,
    },
    authorId: {
        type: String,
        required: true,
        ref: "User"
    },
    taggedPeople: {
        type: [String],
        ref: "User",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Post = (0, mongoose_1.model)("Post", postSchema);
