"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../validator/user");
const userService_1 = require("../service/userService");
const friendRequestService_1 = require("../service/friendRequestService");
const postService_1 = require("../service/postService");
const validator_1 = require("../validator");
const jwt_1 = require("../helpers/Middleware/jwt");
const router = (0, express_1.Router)();
// **************** Public routes *********
// router.post("/add/user" , validate(createUserValidator) , createUserService);
router.route("/signup").post((0, validator_1.validate)(user_1.userSignUpValidator), userService_1.createUserService);
router.route("/login").post((0, validator_1.validate)(user_1.userLogInValidator), userService_1.userLogin);
router.route("/verify-email/:token").get((0, validator_1.validate)(user_1.verifyEmailValidator), userService_1.verifyEmail);
// router.route("/get/:id").get(validate(getUserValidator) , getUserService)
//////////////////***************************User routes */
router.route("/user/friend-request/send/:recipientid").post(jwt_1.auth, friendRequestService_1.SendFriendRequestService);
router.route("/user/friend-request/:recipientid/action/:actiontype").post(jwt_1.auth, friendRequestService_1.acceptFriendRequestService);
router.route("/user/friend-request/pending-list").get(jwt_1.auth, friendRequestService_1.pendingFriendRequestListService);
router.route("/user/friend-list").get(jwt_1.auth, friendRequestService_1.friendsListService);
//////////***************Post **************** //////////////
router.route("/user/post/add").post(jwt_1.auth, postService_1.createPostService);
router.route("/user/post/:postid").delete(jwt_1.auth, postService_1.deletePostService);
router.route("/user/feed").get(jwt_1.auth, postService_1.postFeedService);
exports.default = router;
