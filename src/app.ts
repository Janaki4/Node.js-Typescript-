import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
const app = express();
app.use(json());

import todoRouter from "./routes/todo";

const dbURL: string = "mongodb://127.0.0.1:27017/typescript-prac";
mongoose
  .connect(dbURL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("not connected" + err));

app.use("/public",todoRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).send(err);
});

app.listen(3000);
