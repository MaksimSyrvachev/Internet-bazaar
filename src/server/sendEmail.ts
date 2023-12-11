import nodemailer from 'nodemailer';

import { type SendingEmail } from '@/types/sendingEmail';

export const sendEmail = async (email: SendingEmail) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASS
		}
	});

	const data = {
		from: process.env.EMAIL,
		to: email.to,
		subject: `Applicant for your -${email.title}- wants to contact you!`,
		text: `${email.from} wrote: \n\n ${email.text} \n\n Please reply applicant at this email: ${email.from}`
	};

	await new Promise((resolve, reject) => {
		transporter.sendMail(data, (error, _) => {
			if (error) {
				console.log(error);
				throw new Error();
			} else {
				console.log('Email sent');
			}
		});
	});
};

export const sendEmailWinner = async (email: SendingEmail) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASS
		}
	});

	const data = {
		from: process.env.EMAIL,
		to: email.to,
		subject: `Your are the winner of auction -${email.title}-`,
		text: `Please contact seller at this email address ${email.from}`
	};

	await new Promise((resolve, reject) => {
		transporter.sendMail(data, (error, _) => {
			if (error) {
				console.log(error);
				throw new Error();
			} else {
				console.log('Email sent');
			}
		});
	});
};

export const sendEmailToSeller = async (email: SendingEmail) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASS
		}
	});

	const data = {
		from: process.env.EMAIL,
		to: email.to,
		subject: `Your auction -${email.title}- has been auctioned`,
		text: `Winner -${email.from}- will contact you.`
	};

	await new Promise((resolve, reject) => {
		transporter.sendMail(data, (error, _) => {
			if (error) {
				console.log(error);
				throw new Error();
			} else {
				console.log('Email sent');
			}
		});
	});
};

export const sendEmailNoWinner = async (email: SendingEmail) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASS
		}
	});

	const data = {
		from: process.env.EMAIL,
		to: email.to,
		subject: `Your auction -${email.title}- has not been auctioned`,
		text: `We are sorry, but your auction has not been auctioned. You can now delete auction or create new one.`
	};

	await new Promise((resolve, reject) => {
		transporter.sendMail(data, (error, _) => {
			if (error) {
				console.log(error);
				throw new Error();
			} else {
				console.log('Email sent');
			}
		});
	});
};
