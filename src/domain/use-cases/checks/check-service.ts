import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
	constructor(
		private readonly successCallback: SuccessCallback,
		private readonly errorCallBack: ErrorCallback,
		private readonly logRepository: LogRepository,
	) {}

	static origin: string = 'domain/use-cases/check-services.ts';

	async execute(url: string): Promise<boolean> {
		try {
			const req = await fetch(url);

			if (!req.ok) {
				throw new Error(`Error on check-service ${url}`);
			}

			const log = new LogEntity({
				message: `Server ${url} is working`,
				level: LogSeverityLevel.low,
				origin: CheckService.origin,
			});

			LogSeverityLevel.low, this.logRepository.saveLog(log);
			this.successCallback();

			return true;
		} catch (error) {
			const log = new LogEntity({
				message: `Error message : ${error}`,
				level: LogSeverityLevel.high,
				origin: CheckService.origin,
			});
			this.logRepository.saveLog(log);
			this.errorCallBack(`${error}`);
			return false;
		}
	}
}
