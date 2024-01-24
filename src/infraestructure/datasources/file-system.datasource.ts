import fs from 'fs';

import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDatasource implements LogDataSource {
	private readonly logPath = 'logs/';
	private readonly allLogPath = 'logs/logs-all.log';
	private readonly lowLogPath = 'logs/logs-low.log';
	private readonly mediumLogPath = 'logs/logs-medium.log';
	private readonly highLogPath = 'logs/logs-high.log';

	constructor() {
		this.createLogsFiles();
	}

	private createLogsFiles = () => {
		if (!fs.existsSync(this.logPath)) {
			fs.mkdirSync(this.logPath);
		}

		[
			this.lowLogPath,
			this.mediumLogPath,
			this.highLogPath,
			this.allLogPath,
		].forEach((path) => {
			if (fs.existsSync(path)) return;
			fs.writeFileSync(path, '');
		});
	};

	async saveLog(newLog: LogEntity): Promise<void> {
		const logAsJson = `${JSON.stringify(newLog)} \n `;

		fs.appendFileSync(this.allLogPath, logAsJson);

		switch (newLog.level) {
			case LogSeverityLevel.low:
				fs.appendFileSync(this.lowLogPath, logAsJson);
				break;
			case LogSeverityLevel.medium:
				fs.appendFileSync(this.mediumLogPath, logAsJson);
				break;
			case LogSeverityLevel.high:
				fs.appendFileSync(this.highLogPath, logAsJson);
				break;
		}
	}

	private getLogsFromFile = (path: string): LogEntity[] => {
		const content = fs.readFileSync(path, 'utf-8');
		const logs = content.split('\n').map((log) => LogEntity.fromJson(log));
		return logs;
	};

	getLogs(severityLevel: LogSeverityLevel): LogEntity[] {
		switch (severityLevel) {
			case LogSeverityLevel.low:
				return this.getLogsFromFile(this.lowLogPath);
			case LogSeverityLevel.medium:
				return this.getLogsFromFile(this.mediumLogPath);
			case LogSeverityLevel.high:
				return this.getLogsFromFile(this.highLogPath);

			default:
				throw new Error(`${severityLevel} not implemented`);
		}
	}
}
