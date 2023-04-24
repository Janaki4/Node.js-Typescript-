import { RequestHandler, Response } from "express";
import User from "../modals/user";
import { CONSTANTS } from "../helpers/Constants/index";
import {
  encryptPasswordHelper,
  comparePasswordHelper,
} from "../helpers/Bcrypt";
import _ from "lodash";
import { createJWTToken, verifyJWTHelper } from "../helpers/JWT/index";
import { confirmationMail } from "../helpers/Mailer/index";

export const createUserService: RequestHandler = async (req, res, next) => {
  try {
    let { email, password, name } = req.body;
    const isUserAlreadyExists = await User.findOne({ email, isDeleted: false });

    if (isUserAlreadyExists) {
      return res.status(400).send(CONSTANTS.DUPLICATION);
    }
    password = await encryptPasswordHelper(password);
    const createdJwt = await createJWTToken({ name, email, password });
    const result = await User.create({
      email,
      password,
      name,
      token: createdJwt,
    });
    if (result) {
      const mailRes = await confirmationMail(
        email,
        name,
        "Verify your email address to proceed",
        result.token
      );
    }
    return res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

export const userLogin: RequestHandler = async (req, res, next) => {
  try {
    const { emailId, password } = req.body;
    const isUserExists = await User.findOne({
      email: emailId,
      isDeleted: false,
    });
    if (isUserExists) {
      if (!isUserExists.isEmailVerified) {
        return res.status(400).send(CONSTANTS.EMAIL_NOT_VERIFIED);
      }
      const isPasswordCorrect = await comparePasswordHelper(
        password,
        isUserExists.password
      );
      if (isPasswordCorrect) {
        const createdJwt = await createJWTToken(isUserExists);
        const { _id, name, email } = _.omit(isUserExists, ["password"]);
        let result: { name: string; email: string; id: string; token: string } =
          {
            id: _id,
            name,
            email: email,
            token: createdJwt,
          };
        return res.status(200).send(result);
      } else return res.status(400).send(CONSTANTS.INCORRECT_PASSWORD);
    }
    return res.status(400).send(CONSTANTS.USER_NOT_FOUND);
  } catch (error) {
    next(error);
  }
};

export const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const token: string = req.params.token;
    const decodedJwt = await verifyJWTHelper(token);
    const userDetails = await User.findOne({
      email: decodedJwt.email,
      isDeleted: false,
    });
    if (userDetails) {
      if (!userDetails?.isEmailVerified) {
        await User.updateOne(
          { email: decodedJwt.email },
          { isEmailVerified: true }
        );
        return res.status(200).send(CONSTANTS.EMAIL_VERIFIED);
      }
      return res.status(200).send(CONSTANTS.EMAIL_ALREADY_VERIFIED)
    }
    else { 
      return res.status(400).send(CONSTANTS.UNSUCCESS);
    }
  } catch (error) {
    next(error);
  }
};

export const getUserService: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findById({ _id: id });
    return res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};
