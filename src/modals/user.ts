import mongoose, { Schema, model } from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  isDeleted?: boolean;
  token: string;
  isEmailVerified: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default:false
    }
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   let data = this as IUser;
//   if (data.isModified("password")) {
//     data.password = await bcrypt.hash(data.password, 10);
//   }
//   next();
// });

const User = model<IUser>("User", userSchema);

export default User;
