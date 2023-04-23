import { RequestHandler,Response } from "express";
import User from "../modals/user";

export const createUserService: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await User.create({ email, password });
    return res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};


export const getUserService: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await User.findById({ _id:id  })
        return res.status(201).send(result);
    } catch (error) {
        next(error)
    }
 }