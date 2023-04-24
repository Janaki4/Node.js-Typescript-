"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmationMail = void 0;
const nodeMailer = require("nodemailer");
require("dotenv").config();
const transporter = nodeMailer.createTransport({
    service: process.env.MAILER_SERVICE,
    port: process.env.MAILER_PORT,
    secure: false,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
    },
});
const confirmationMail = async (email, name, message, token) => {
    const html = `http://localhost:3000/public/user/verify-email/${token}`;
    const emailSent = await transporter.sendMail({
        from: process.env.MAILER_USER,
        to: email,
        subject: `Verify your email id`,
        text: `Hi ${name} , ${message}`,
        html: `<p style="color:blue;font-size:10px;background-color:black;color:white"><a href=${html}>Click Me</a>${message}</p>`,
    });
    return emailSent;
};
exports.confirmationMail = confirmationMail;
