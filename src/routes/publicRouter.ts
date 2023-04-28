import { Router, RequestHandler } from "express";
import { userSignUpValidator , userLogInValidator,verifyEmailValidator} from "../validator/user";
import { createUserService ,userLogin, getUserService ,verifyEmail, } from '../service/userService'
import { SendFriendRequestService ,acceptFriendRequestService , pendingFriendRequestListService ,friendsListService } from "../service/friendRequestService"
import { createPostService , deletePostService, postFeedService } from "../service/postService"
import { validate } from "../validator";
import { auth } from "../helpers/Middleware/jwt";
const router = Router();

// **************** Public routes *********
// router.post("/add/user" , validate(createUserValidator) , createUserService);
router.route("/signup").post( validate(userSignUpValidator) , createUserService)
router.route("/login").post( validate(userLogInValidator) ,  userLogin)
router.route("/verify-email/:token").get(validate(verifyEmailValidator), verifyEmail)

// router.route("/get/:id").get(validate(getUserValidator) , getUserService)

//////////////////***************************User routes */

router.route("/user/friend-request/send/:recipientid").post(auth , SendFriendRequestService)
router.route("/user/friend-request/:recipientid/action/:actiontype").post(auth, acceptFriendRequestService)
router.route("/user/friend-request/pending-list").get(auth , pendingFriendRequestListService)
router.route("/user/friend-list").get(auth , friendsListService)

//////////***************Post **************** //////////////
router.route("/user/post/add").post(auth , createPostService)
router.route("/user/post/:postid").delete(auth , deletePostService)
router.route("/user/feed").get(auth , postFeedService)


export default router;