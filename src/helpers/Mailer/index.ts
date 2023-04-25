const nodeMailer = require("nodemailer");
require("dotenv").config()

const transporter = nodeMailer.createTransport({
  service: process.env.MAILER_SERVICE,
  port: process.env.MAILER_PORT,
  secure: false,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD, 
  },
});

export const confirmationMail = async (
  email: string,
  name: string,
  message: string,
  token: string
): Promise<{}> => {
  const html: string = `http://localhost:3000/public/verify-email/${token}`;
  const emailSent =  await transporter.sendMail({
    from: process.env.MAILER_USER,
    to: email,
    subject: `Verify your email id`,
    text: `Hi ${name} , ${message}`,
    html: `<p style="color:blue;font-size:10px;background-color:black;color:white"><a href=${html}>Click Me</a>${message}</p>`,
  });
    return emailSent
};
