import { Schema, model } from "mongoose";
import { FriendRequestInterface } from "../Interface/userInterface";
import { string } from "zod";

const friendRequestSchema = new Schema<FriendRequestInterface>({
    requestedUser: {
        type: String,
        required: true,
        ref: "User"
    },
    recipientUser: {
        type: String,
        required: true,
        ref: "User"
    },
    requestStatus: {
        type: Number,
        default: 0
        // 0,1,2 -> requested , accepted , rejected
    }
})

export const FriendRequest = model("FriendRequest" , friendRequestSchema)