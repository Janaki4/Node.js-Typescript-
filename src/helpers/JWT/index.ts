const jwt = require("jsonwebtoken");
require("dotenv").config();

interface User {
  _id?: string;
  email: string;
  name: string;
}

export async function createJWTToken<T extends User>(data: T): Promise<string> {
  const token = await jwt.sign(
    { id: data._id, name: data.name, email: data.email },
    process.env.JWT_SECRET_KEY
  );
  return Promise.resolve(token);
}
interface JwtPayload {
    email?: string;
    name?: string
    id?:string
  }
export async function verifyJWTHelper(token: string): Promise<JwtPayload> {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decoded
}
