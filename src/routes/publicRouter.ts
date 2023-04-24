import { Router, RequestHandler } from "express";
import { createUserService ,userLogin, getUserService ,verifyEmail, } from '../service/userService'
import { userSignUpValidator , userLogInValidator,verifyEmailValidator,  getUserValidator} from "../validator/user";
import { validate } from "../validator";
const router = Router();


// router.post("/add/user" , validate(createUserValidator) , createUserService);
router.route("/user/signup").post( validate(userSignUpValidator) , createUserService)
router.route("/user/login").post( validate(userLogInValidator) ,  userLogin)
router.route("/user/verify-email/:token").get(validate(verifyEmailValidator), verifyEmail)

router.route("/get/:id").get(validate(getUserValidator) , getUserService)


export default router;