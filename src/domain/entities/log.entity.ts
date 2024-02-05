export enum LogSeverityLevel {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

export interface LogEntitiesOptions {
	level: LogSeverityLevel;
	message: string;
	origin: string;
	createdAt?: Date;
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;
	public origin: string;

	constructor(options: LogEntitiesOptions) {
		const { level, message, origin, createdAt = new Date() } = options;
		this.level = level;
		this.message = message;
		this.origin = origin;
		this.createdAt = createdAt;
	}

	static fromJson = (json: string): LogEntity => {
		const { message, level, createdAt, origin } = JSON.parse(json.trim());
		const log = new LogEntity({
			message,
			level,
			createdAt: new Date(createdAt),
			origin,
		});
		return log;
	};

	static fromObject = (object: { [key: string]: any }): LogEntity => {
		const { level, message, origin, createdAt } = object;

		const log = new LogEntity({
			level,
			message,
			origin,
			createdAt: new Date(createdAt),
		});
		return log;
	};
}
