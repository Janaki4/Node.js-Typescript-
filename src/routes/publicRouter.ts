import { Router, RequestHandler } from "express";
import { createUserService ,userLogin, getUserService ,verifyEmail, } from '../service/userService'
import { userSignUpValidator , userLogInValidator,verifyEmailValidator} from "../validator/user";
import { SendFriendRequestService ,acceptFriendRequestService , pendingFriendRequestListService ,friendsListService } from "../service/friendRequestService"
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

router.route("/user/friend-request/send/:receipientid").post(auth , SendFriendRequestService)
router.route("/user/friend-request/:recipientid/action/:actiontype").post(auth, acceptFriendRequestService)
router.route("/user/friend-request/pending-list").get(auth , pendingFriendRequestListService)
router.route("/user/friend-list").get(auth , friendsListService)

export default router;