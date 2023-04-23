import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  };
