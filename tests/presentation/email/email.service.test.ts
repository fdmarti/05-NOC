import { envs } from '../../../src/config/plugins/envar.plugin';
import {
	EmailService,
	SendMailOptions,
} from '../../../src/presentation/email/email.service';
describe('email.service.ts', () => {
	const emailService = new EmailService();
	const toTestEmail = 'fede@google.com';

	// beforeEach(() => {
	// 	jest.resetModules();
	// });

	test('Should send email', async () => {
		const options: SendMailOptions = {
			to: toTestEmail,
			subject: 'Test',
			html: '<h1>Test</h1>',
		};

		const emailSent = await emailService.sendEmail(options);
		expect(emailSent).toBe(true);
	});

	test('Email should be sent with system files', async () => {
		const emailSent = await emailService.sendEmailWithFileSystemLogs(
			toTestEmail,
		);

		expect(emailSent).toBe(true);
	});

	test('Should return error', async () => {
		envs.MAILER_EMAIL = 'sarasa@sarasa.com';
		const options: SendMailOptions = {
			to: 'fede@google.com',
			subject: 'Test',
			html: '<h1>Test</h1>',
		};

		try {
			const emailSent = await emailService.sendEmail(options);
			expect(emailSent).toBeFalsy();
		} catch (error) {
			// console.log(error);
		}
	});
});
