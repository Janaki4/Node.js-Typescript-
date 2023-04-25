import { z } from "zod";

//public
export const userSignUpValidator = z.object({
  body: z.object({
    email: z.string({required_error: "email is required",}).email({ message: 'Must be a valid email' }),
    password: z.string({ required_error: "password is required", }),
    name: z.string({required_error:"name is required"})
  }),
});

export const userLogInValidator = z.object({
  body: z.object({
    emailId: z.string({required_error: "email is required",}).email({ message: 'Must be a valid email' }),
    password: z.string({ required_error: "password is required", }),
  })
})

export const getUserValidator = z.object({
    params: z.object({
        id: z.string({required_error:"id is reauired"})
    })
})

export const verifyEmailValidator = z.object({
  params: z.object({
    token: z.string()
  })
})

// private
// export const friendRequestActionValidator = z.object({
//   params: z.object({
//     recipientid: z.string({required_error:"id is reauired"}),
//     actiontype:z.string({required_error:"action is required"})
//   })
// })

// export const sendFriendRequestValidator = z.object({
//   params: z.object({
//     recipientid: z.string({required_error:"id is reauired"})
//   })
// })