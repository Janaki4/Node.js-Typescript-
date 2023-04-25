import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { errorResponse } from "./helpers/Responses";

const app = express();
app.use(json());
app.use(cors())

import publicRouter from "./routes/publicRouter";

const dbURL: string = "mongodb://127.0.0.1:27017/typescript-prac";
mongoose
  .connect(dbURL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("not connected" + err));

app.use("/public",publicRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).send(errorResponse(err));
});

app.listen(3000);
