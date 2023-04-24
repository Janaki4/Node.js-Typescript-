import bcrypt from "bcrypt";
import { number } from "zod";
require("dotenv").config();

const salt: string = process.env.BCRYPT_SALT!;

export const encryptPasswordHelper = async (
  plainPassword: string
): Promise<string> => {
  const encryptedPassword = await bcrypt.hash(plainPassword, +salt);
  return encryptedPassword;
};

export const comparePasswordHelper = async (
  plainPassword: string,
  encryptedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, encryptedPassword);
};
