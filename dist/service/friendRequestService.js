"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsListService = exports.pendingFriendRequestListService = exports.acceptFriendRequestService = exports.SendFriendRequestService = void 0;
const friendRequest_1 = require("../modals/friendRequest");
const index_1 = require("../helpers/Responses/index");
const index_2 = require("../helpers/Constants/index");
const user_1 = __importDefault(require("../modals/user"));
const SendFriendRequestService = async (req, res, next) => {
    try {
        const userId = req.id;
        const requestedToUserId = req.params.recipientid;
        if (userId === requestedToUserId)
            return res.status(400).send((0, index_1.successResponse)(index_2.CONSTANTS.INVALID_REQUEST));
        const isRecipientUserExists = await user_1.default.findOne({
            _id: requestedToUserId,
            isDeleted: false,
        });
        if (isRecipientUserExists) {
            if (isRecipientUserExists.friendsList.includes(userId))
                return res.status(400).send((0, index_1.errorResponse)(index_2.CONSTANTS.ALREADY_FRIENDS));
            await friendRequest_1.FriendRequest.create({
                requestedBy: userId,
                requestedTo: requestedToUserId,
            });
            return res.status(201).send((0, index_1.successResponse)(index_2.CONSTANTS.SUCCESS));
        }
        else
            return res
                .status(400)
                .send((0, index_1.errorResponse)(index_2.CONSTANTS.RECIPIENT_NOT_EXISTS));
    }
    catch (error) {
        next(error);
    }
};
exports.SendFriendRequestService = SendFriendRequestService;
const acceptFriendRequestService = async (req, res, next) => {
    try {
        const userId = req.id;
        const actionType = req.params.actiontype;
        const recipientId = req.params.recipientid;
        if (+actionType !== 1 && +actionType !== 2)
            return res.status(200).send((0, index_1.successResponse)(index_2.CONSTANTS.INVALID_REQUEST));
        const isRecordExists = await friendRequest_1.FriendRequest.findOne({
            requestedTo: userId,
            requestStatus: 0,
            requestedBy: recipientId,
        });
        if (isRecordExists) {
            const result = await friendRequest_1.FriendRequest.updateOne({
                requestedTo: userId,
                requestStatus: 0,
                requestedBy: recipientId,
            }, { requestStatus: +actionType }, {
                new: true,
            });
            if (result == null) {
                res.status(400).send((0, index_1.successResponse)(index_2.CONSTANTS.INVALID_REQUEST));
            }
            if (+actionType === 1) {
                const addedFriend = await user_1.default.updateOne({ _id: recipientId }, { $push: { friendsList: userId } });
                if (addedFriend.modifiedCount) {
                    return res
                        .status(200)
                        .send((0, index_1.successResponse)(index_2.CONSTANTS.FRIEND_REQUEST_ACCEPTED));
                }
                else {
                    return res.status(400).send((0, index_1.errorResponse)(index_2.CONSTANTS.INVALID_REQUEST));
                }
            }
            else {
                return res
                    .status(200)
                    .send((0, index_1.successResponse)(index_2.CONSTANTS.FRIEND_REQUEST_DECLINED));
            }
        }
        else {
            return res.status(400).send((0, index_1.successResponse)(index_2.CONSTANTS.INVALID_REQUEST));
        }
    }
    catch (error) {
        next(error);
    }
};
exports.acceptFriendRequestService = acceptFriendRequestService;
const pendingFriendRequestListService = async (req, res, next) => {
    try {
        const userId = req.id;
        const pendindList = await friendRequest_1.FriendRequest.find({
            requestedTo: userId,
            requestStatus: 0,
        }).populate("requestedBy");
        return res.status(200).send((0, index_1.successResponse)(pendindList));
    }
    catch (error) {
        next(error);
    }
};
exports.pendingFriendRequestListService = pendingFriendRequestListService;
const friendsListService = async (req, res, next) => {
    try {
        const userId = req.id;
        const result = await user_1.default.findOne({
            _id: userId,
            isDeleted: false,
        }).populate("friendsList");
        if (result) {
            const resData = result === null || result === void 0 ? void 0 : result.friendsList.map((data) => {
                const newData = { ...data._doc };
                newData === null || newData === void 0 ? true : delete newData.password;
                newData === null || newData === void 0 ? true : delete newData.isDeleted;
                newData === null || newData === void 0 ? true : delete newData.isEmailVerified;
                newData === null || newData === void 0 ? true : delete newData.token;
                newData === null || newData === void 0 ? true : delete newData.friendsList;
                newData === null || newData === void 0 ? true : delete newData.createdAt;
                newData === null || newData === void 0 ? true : delete newData.updatedAt;
                newData === null || newData === void 0 ? true : delete newData.__v;
                return newData;
            });
            res.status(200).send((0, index_1.successResponse)(resData));
        }
        else
            res.status(400).send((0, index_1.errorResponse)(index_2.CONSTANTS.UNSUCCESS));
    }
    catch (error) {
        next(error);
    }
};
exports.friendsListService = friendsListService;
