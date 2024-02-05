import { LogEntity } from '../../../src/domain/entities/log.entity';
import { CheckService } from '../../../src/domain/use-cases/checks/check-service';
describe('use-cases/check-service', () => {
	const mockRepository = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};

	const successCallBack = jest.fn();
	const errorCallBack = jest.fn();

	const checkService = new CheckService(
		successCallBack,
		errorCallBack,
		mockRepository,
	);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('Should call successCallBack when fetch return true', async () => {
		const wasSuccess = await checkService.execute('https://www.google.com/');
		expect(wasSuccess).toBeTruthy();
		expect(successCallBack).toHaveBeenCalled();
		expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});

	test('Should call errorCallBack when fetch return false', async () => {
		const wasError = await checkService.execute('https://www.asddasas123.com/');
		expect(wasError).toBeFalsy();
		expect(successCallBack).not.toHaveBeenCalled();
		expect(errorCallBack).toHaveBeenCalled();
	});
});
