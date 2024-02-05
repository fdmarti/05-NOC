import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from '../../../src/infraestructure/datasources/file-system.datasource';
import {
	LogEntity,
	LogSeverityLevel,
} from '../../../src/domain/entities/log.entity';
describe('file-system.datasource.ts', () => {
	const logPath = path.join(__dirname, '../../../logs');

	beforeEach(() => {
		fs.rmSync(logPath, { recursive: true, force: true });
	});

	const newLogMock = {
		origin: 'file-system.datasource.test.ts',
		level: LogSeverityLevel.low,
		message: 'Message test',
		createdAt: new Date(),
	};

	test('Should create log files if they do not exists', () => {
		new FileSystemDatasource();
		const files = fs.readdirSync(logPath);
		expect(files).toEqual([
			'logs-all.log',
			'logs-high.log',
			'logs-low.log',
			'logs-medium.log',
		]);
	});

	test('Should save a log in logs-all.log', () => {
		const logDataSource = new FileSystemDatasource();
		const log = new LogEntity(newLogMock);

		logDataSource.saveLog(log);

		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
		expect(allLogs).toContain(JSON.stringify(log));
	});

	test('Should save a log in logs-all.log and logs.medium.log', () => {
		const logDataSource = new FileSystemDatasource();
		newLogMock.level = LogSeverityLevel.medium;
		const log = new LogEntity(newLogMock);

		logDataSource.saveLog(log);

		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
		expect(allLogs).toContain(JSON.stringify(log));

		const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
		expect(mediumLogs).toContain(JSON.stringify(log));
	});

	test('Should save a log in logs-all.log and logs.hight.log', () => {
		const logDataSource = new FileSystemDatasource();
		newLogMock.level = LogSeverityLevel.high;
		const log = new LogEntity(newLogMock);

		logDataSource.saveLog(log);

		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
		expect(allLogs).toContain(JSON.stringify(log));

		const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
		expect(highLogs).toContain(JSON.stringify(log));
	});

	test('Should return all logs', async () => {
		const logDataSource = new FileSystemDatasource();

		const lowLog = {
			origin: 'file-system.datasource.test.ts',
			level: LogSeverityLevel.low,
			message: 'Message test low',
			createdAt: new Date(),
		};

		const mediumLog = {
			origin: 'file-system.datasource.test.ts',
			level: LogSeverityLevel.medium,
			message: 'Message test medium',
			createdAt: new Date(),
		};

		const highLog = {
			origin: 'file-system.datasource.test.ts',
			level: LogSeverityLevel.high,
			message: 'Message test high',
			createdAt: new Date(),
		};

		const logLow = new LogEntity(lowLog);
		await logDataSource.saveLog(logLow);
		const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);

		const logMedium = new LogEntity(mediumLog);
		await logDataSource.saveLog(logMedium);
		const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);

		const logHigh = new LogEntity(lowLog);
		await logDataSource.saveLog(logHigh);
		const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

		expect(logsLow).toEqual(expect.arrayContaining(logsLow));
		expect(logsMedium).toEqual(expect.arrayContaining(logsMedium));
		expect(logsHigh).toEqual(expect.arrayContaining(logsHigh));
	});

	test('Should not throw an error if path exists', () => {
		new FileSystemDatasource();
		new FileSystemDatasource();

		expect(true).toBeTruthy();
	});

	test('Should throw an error if severity level is not defined', async () => {
		const logDataSource = new FileSystemDatasource();
		const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;

		try {
			await logDataSource.getLogs(customSeverityLevel);
			expect(true).toBeFalsy();
		} catch (error) {
			const errorStrin = `${error}`;
			expect(errorStrin).toBe(`Error: ${customSeverityLevel} not implemented`);
		}
	});
});
