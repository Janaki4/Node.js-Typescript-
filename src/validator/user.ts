import { z } from "zod";

export const createUserValidator = z.object({
  body: z.object({
    email: z.string({required_error: "email is required",}),
    password: z.string({required_error: "password is required",}),
  }),
});

export const getUserValidator = z.object({
    params: z.object({
        id: z.string({required_error:"id is reauired"})
    })
})