import { Router, RequestHandler } from "express";
import { createUserService , getUserService } from '../service/userService'
import { createUserValidator ,  getUserValidator} from "../validator/user";
import { validate } from "../validator";
const router = Router();


// router.post("/add/user" , validate(createUserValidator) , createUserService);
router.route("/add/user").post( validate(createUserValidator) , createUserService)

router.route("/get/:id").get(validate(getUserValidator) , getUserService)


export default router;