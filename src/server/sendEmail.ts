import nodemailer from 'nodemailer';

import { type SendingEmail } from '@/types/sendingEmail';

type DataEmail = {
	from: string | undefined;
	to: string;
	subject: string;
	text: string;
};

const transport = async (data: DataEmail) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASS
		}
	});

	return await new Promise((resolve, _) => {
		transporter.sendMail(data, (error, _) => {
			if (error) {
				console.log(error);
				resolve(false);
			} else {
				console.log('Email sent');
				resolve(true);
			}
		});
	});
};

export const sendEmail = async (email: SendingEmail) => {
	const data = {
		from: process.env.EMAIL,
		to: email.to,
		subject: `Applicant for your -${email.title}- wants to contact you!`,
		text: `${email.from} wrote: \n\n ${email.text} \n\n Please reply applicant at this email: ${email.from}`
	};

	if (!(await transport(data))) {
		new Error();
	}
};

export const sendEmailWinner = async (email: SendingEmail) => {
	const data = {
		from: process.env.EMAIL,
		to: email.to,
		subject: `Your are the winner of auction -${email.title}-`,
		text: `Please contact seller at this email address ${email.from}`
	};

	if (!(await transport(data))) {
		new Error();
	}
};

export const sendEmailToSeller = async (email: SendingEmail) => {
	const data = {
		from: process.env.EMAIL,
		to: email.to,
		subject: `Your auction -${email.title}- has been auctioned`,
		text: `Winner -${email.from}- will contact you.`
	};

	if (!(await transport(data))) {
		new Error();
	}
};

export const sendEmailNoWinner = async (email: SendingEmail) => {
	const data = {
		from: process.env.EMAIL,
		to: email.to,
		subject: `Your auction -${email.title}- has not been auctioned`,
		text: `We are sorry, but your auction has not been auctioned. You can now delete auction or create new one.`
	};

	if (!(await transport(data))) {
		new Error();
	}
};
