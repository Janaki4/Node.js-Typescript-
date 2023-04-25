import { RequestHandler } from "express";
import { verifyJWTHelper } from "../JWT/index";
import { CustomRequest } from "../../Interface/userInterface";
import { successResponse, errorResponse } from "../Responses/index";
import { CONSTANTS } from "../Constants";

export const auth: RequestHandler = async (req: CustomRequest, res, next) => {
  try {
    if (req.headers.authorization) {
      const headerToken: string = req.headers.authorization;
      const token: string = headerToken.replace("Bearer ", "");
      const decoded = await verifyJWTHelper(token);
      req.id = decoded.id;
      req.email = decoded.email;
      req.name = decoded.name;
      next();
    } else {
      return res
        .status(400)
        .send(errorResponse(CONSTANTS.ACCESS_TOKEN_MISSING));
    }
  } catch (error) {
    next(error);
  }
};
