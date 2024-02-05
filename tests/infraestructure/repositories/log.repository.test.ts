import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';
import { LogRepositoryImplementation } from '../../../src/infraestructure/repositories/log.repository';
describe('log.repository.ts', () => {
	const mocklogDataSource = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};

	const logRepository = new LogRepositoryImplementation(mocklogDataSource);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('saveLog should call the datasource', async () => {
		const log = { level: LogSeverityLevel.low, message: 'hola' } as LogEntity;
		await logRepository.saveLog(log);

		expect(mocklogDataSource.saveLog).toHaveBeenCalled();
		expect(mocklogDataSource.saveLog).toHaveBeenCalledWith(log);
	});

	test('saveLog should return with arguments', async () => {
		await logRepository.getLogs(LogSeverityLevel.low);
		expect(mocklogDataSource.getLogs).toHaveBeenCalled();
		expect(mocklogDataSource.getLogs).toHaveBeenCalledWith(
			LogSeverityLevel.low,
		);
	});
});
