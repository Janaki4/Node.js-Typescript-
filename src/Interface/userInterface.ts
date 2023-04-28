import mongoose from "mongoose";
import { Request } from "express";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  isDeleted?: boolean;
  token: string;
  isEmailVerified: boolean;
  friendsList: Array<string>;
}

export interface FriendRequestInterface extends mongoose.Document {
  requestedBy: String;
  requestedTo: String;
  requestStatus: number;
}

export interface CustomRequest extends Request { 
    id?: string
    name?: string
    email?:string
}