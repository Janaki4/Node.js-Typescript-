import { FriendRequest } from "../modals/friendRequest";
import { RequestHandler } from "express";
import { successResponse, errorResponse } from "../helpers/Responses/index";
import { CONSTANTS } from "../helpers/Constants/index";
import { CustomRequest } from "../Interface/userInterface";
import User from "../modals/user";
import { Post } from "../modals/post";
import { IUser } from "../Interface/userInterface";
import _ from "lodash";



export const createPostService: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        const userId = req.id
        let { description, image, isImageAvailable, taggedPeople } = req.body
        if (!isImageAvailable) image = null
        const postCreated = await Post.create({ authorId: userId, description, image, isImageAvailable, taggedPeople })
        res.status(201).send(successResponse(postCreated))
    } catch (error) {
        next(error)
    }
}

export const deletePostService: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        const userId = req.id
        const postId = req.params.postid
        const postDeleted = await Post.findOneAndDelete({ authorId: userId, _id: postId, isDeleted: false }, { isDeleted: true })
        if (postDeleted) {
            return res.status(200).send(successResponse(CONSTANTS.SUCCESS))
        }
        res.status(400).send(errorResponse(CONSTANTS.UNSUCCESS))
    } catch (error) {
        next(error)
    }
}

export const postFeedService: RequestHandler = async (req:CustomRequest, res, next) => {
    try {
        const userId = req.id
        const pageNumber  = +(req.query.pageNumber || 1)
        const pageSize = +(req.query.pageSize || 10)
        const userDetails = await User.findOne({ _id: userId, isDeleted: false })
        if (userDetails) {
            const listOfFriends = userDetails.friendsList
            const postDetails = await Post.find({ authorId: { $in: listOfFriends } })
                .sort({ createdAt: -1 }).skip(pageSize * (pageNumber - 1)).limit(pageSize)
            return res.status(200).send(successResponse(postDetails))
        }
        res.status(400).send(errorResponse(CONSTANTS.UNSUCCESS))
    } catch (error) {
        next(error)
    }
}