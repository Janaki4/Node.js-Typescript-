import { FriendRequest } from "../modals/friendRequest";
import { RequestHandler } from "express";
import { successResponse, errorResponse } from "../helpers/Responses/index";
import { CONSTANTS } from "../helpers/Constants/index";
import { CustomRequest } from "../Interface/userInterface";
import User from "../modals/user";
import { Post } from "../modals/post";
import { IUser } from "../Interface/userInterface";
import _ from "lodash";


