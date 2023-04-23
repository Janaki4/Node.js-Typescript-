import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";


export interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String, 
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  let data = this as IUser;
  if (data.isModified("password")) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  next();
});

const User = model<IUser>("User", userSchema);

export default User;
