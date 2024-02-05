import mongoose from 'mongoose';
import { MongoDataBase } from '../../../src/data/mongo/init';
import { envs } from '../../../src/config/plugins/envar.plugin';
import { LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { MongoLogDataSource } from '../../../src/infraestructure/datasources/mongo-log.datasource';
import { LogModel } from '../../../src/data/mongo';

describe('mongo-log.datasource.ts', () => {
	beforeAll(async () => {
		await MongoDataBase.connect({
			dbName: envs.MONGO_DB_NAME,
			mongoUrl: envs.MONGO_URL,
		});
	});

	afterAll(async () => {
		await LogModel.deleteMany();
	});

	afterAll(async () => {
		mongoose.connection.close();
	});

	const newLogMock = {
		origin: 'log.datasource.test.ts',
		level: LogSeverityLevel.low,
		message: 'Message test',
		createdAt: new Date(),
	};

	const mockMongoLogDataSource = new MongoLogDataSource();

	test('Should create a log', async () => {
		const logSpy = jest.spyOn(console, 'log');

		await mockMongoLogDataSource.saveLog(newLogMock);

		expect(logSpy).toHaveBeenCalled();
		expect(logSpy).toHaveBeenCalledWith(
			'Mongo Log created',
			expect.any(String),
		);
	});

	test('Should get logs', async () => {
		await mockMongoLogDataSource.saveLog(newLogMock);
		const logs = await mockMongoLogDataSource.getLogs(LogSeverityLevel.low);

		expect(logs[0].level).toBe(LogSeverityLevel.low);
	});
});
