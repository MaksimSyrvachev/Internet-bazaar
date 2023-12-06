
import {SendingEmail} from "@/types/sendingEmail";
import nodemailer from "nodemailer";
import {date} from "zod";

export const sendEmail = async (email: SendingEmail) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });


    const data = ({
        from: process.env.EMAIL,
        to: email.to,
        subject: `Applicant for your -${email.title}- wants to contact you!`,
        text: `${email.from} wrote: \n\n ${email.text} \n\n Please reply applicant at this email: ${email.from}`
    });

    transporter.sendMail(data, function (error, info) {
        if (error) {
            console.log(error)
            throw new Error();
        } else {
            console.log("Email Sent");
        }
    });
}
