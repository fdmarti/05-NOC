import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';
describe('log.entity.ts', () => {
	const mockLog = {
		origin: 'log.entity.test.ts',
		message: 'Mock message',
		level: LogSeverityLevel.low,
	};

	test('Should create a LogEntity instance', () => {
		const mockNewLog = new LogEntity(mockLog);
		expect(typeof mockNewLog).toBe('object');
		expect(mockNewLog.message).toBe(mockLog.message);
		expect(mockNewLog.level).toBe(mockLog.level);
		expect(mockNewLog.origin).toBe(mockLog.origin);
		expect(mockNewLog.createdAt).toBeInstanceOf(Date);
	});

	test('Should create a logEntity instance from JSON', () => {
		const mockLogJson = `{"level":"low","message":"Server http://localhost:8080/users is working","origin":"domain/use-cases/check-services.ts","createdAt":"2024-01-30T13:43:50.006Z"} `;

		const log = LogEntity.fromJson(mockLogJson);

		expect(log.message).toBe('Server http://localhost:8080/users is working');
		expect(log.level).toBe('low');
		expect(log.origin).toBe('domain/use-cases/check-services.ts');
		expect(log.createdAt).toBeInstanceOf(Date);
	});

	test('Should create a LogEntity instance from Object', () => {
		const mockLogObjectMongo = {
			_id: {
				$oid: '65bd0b8bf3239606fc9b8184',
			},
			level: 'low',
			message: 'test message',
			origin: 'log.model.test.ts',
			createdAt: {
				$date: '2024-02-02T15:34:35.078Z',
			},
			__v: 0,
		};

		const log = LogEntity.fromObject(mockLogObjectMongo);

		expect(log.message).toBe('test message');
		expect(log.level).toBe('low');
		expect(log.origin).toBe('log.model.test.ts');
		expect(log.createdAt).toBeInstanceOf(Date);
	});
});
