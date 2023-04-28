"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postFeedService = exports.deletePostService = exports.createPostService = void 0;
const index_1 = require("../helpers/Responses/index");
const index_2 = require("../helpers/Constants/index");
const user_1 = __importDefault(require("../modals/user"));
const post_1 = require("../modals/post");
const createPostService = async (req, res, next) => {
    try {
        const userId = req.id;
        let { description, image, isImageAvailable, taggedPeople } = req.body;
        if (!isImageAvailable)
            image = null;
        const postCreated = await post_1.Post.create({ authorId: userId, description, image, isImageAvailable, taggedPeople });
        res.status(201).send((0, index_1.successResponse)(postCreated));
    }
    catch (error) {
        next(error);
    }
};
exports.createPostService = createPostService;
const deletePostService = async (req, res, next) => {
    try {
        const userId = req.id;
        const postId = req.params.postid;
        const postDeleted = await post_1.Post.findOneAndDelete({ authorId: userId, _id: postId, isDeleted: false }, { isDeleted: true });
        if (postDeleted) {
            return res.status(200).send((0, index_1.successResponse)(index_2.CONSTANTS.SUCCESS));
        }
        res.status(400).send((0, index_1.errorResponse)(index_2.CONSTANTS.UNSUCCESS));
    }
    catch (error) {
        next(error);
    }
};
exports.deletePostService = deletePostService;
const postFeedService = async (req, res, next) => {
    try {
        const userId = req.id;
        const pageNumber = +(req.query.pageNumber || 1);
        const pageSize = +(req.query.pageSize || 10);
        const userDetails = await user_1.default.findOne({ _id: userId, isDeleted: false });
        if (userDetails) {
            const listOfFriends = userDetails.friendsList;
            const postDetails = await post_1.Post.find({ authorId: { $in: listOfFriends } })
                .sort({ createdAt: -1 }).skip(pageSize * (pageNumber - 1)).limit(pageSize);
            return res.status(200).send((0, index_1.successResponse)(postDetails));
        }
        res.status(400).send((0, index_1.errorResponse)(index_2.CONSTANTS.UNSUCCESS));
    }
    catch (error) {
        next(error);
    }
};
exports.postFeedService = postFeedService;
