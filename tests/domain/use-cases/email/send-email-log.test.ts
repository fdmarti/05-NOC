import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-log';

describe('email/send-email-log', () => {
	const mockRepository = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};

	const mockEmailService = {
		sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const sendEmailLogs = new SendEmailLogs(
		mockEmailService as any,
		mockRepository,
	);

	test('Should call sendEmail and saveLog', async () => {
		const result = await sendEmailLogs.execute('fdmartinez44@gmail.com');
		expect(result).toBeTruthy();

		expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
		expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});

	test('Should return an error', async () => {
		mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);
		const result = await sendEmailLogs.execute('fdmartinez44@gmail.com');

		expect(result).toBeFalsy();
		expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
	});
});
