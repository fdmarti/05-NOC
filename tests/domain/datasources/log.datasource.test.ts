import { LogDataSource } from '../../../src/domain/datasources/log.datasource';
import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';

describe('log.datasource', () => {
	const newLogMock = {
		origin: 'log.datasource.test.ts',
		level: LogSeverityLevel.low,
		message: 'Message test',
		createdAt: new Date(),
	};

	class MockLogDataSource implements LogDataSource {
		async saveLog(log: LogEntity): Promise<void> {
			return;
		}
		async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
			return [newLogMock];
		}
	}

	const mockLogDataSource = new MockLogDataSource();

	test('Should test the abstract class', () => {
		expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
		expect(typeof mockLogDataSource.getLogs).toBe('function');
		expect(typeof mockLogDataSource.saveLog).toBe('function');
	});

	test('Should save a log', async () => {
		await mockLogDataSource.saveLog(newLogMock);
	});

	test('Should return a severity level', async () => {
		const logs = await mockLogDataSource.getLogs(LogSeverityLevel.low);
		expect(logs).toHaveLength(1);
		expect(typeof logs[0]).toBe('object');
	});
});
