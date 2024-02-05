import { createTransport } from 'nodemailer';
import { envs } from '../../config/plugins/envar.plugin';

export interface SendMailOptions {
	to: string | string[];
	subject: string;
	html: string;
	attachments?: Attachments[];
}

export interface Attachments {
	filename: string;
	path: string;
}

export class EmailService {
	private transporter = createTransport({
		service: 'gmail',
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});

	constructor() {}

	async sendEmail(options: SendMailOptions): Promise<boolean> {
		try {
			const { to, subject, html, attachments = [] } = options;

			const sentInformation = await this.transporter.sendMail({
				to,
				subject,
				html: html,
				attachments,
			});

			return true;
		} catch (error) {
			return false;
		}
	}

	async sendEmailWithFileSystemLogs(to: string | string[]) {
		const subject = 'Logs del servidor';
		const html = `
        <h2>Logs del sistema</h2>
        <p>lorem ipsum</p>
        <button>Confirmar</button>
        `;

		const attachments: Attachments[] = [
			{
				filename: 'logs-all.log',
				path: './logs/logs-all.log',
			},
			{
				filename: 'logs-low.log',
				path: './logs/logs-low.log',
			},
			{
				filename: 'logs-high.log',
				path: './logs/logs-high.log',
			},
		];

		return await this.sendEmail({
			to,
			subject,
			html,
			attachments,
		});
	}
}
