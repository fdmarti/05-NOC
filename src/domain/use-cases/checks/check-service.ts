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

	async execute(url: string): Promise<boolean> {
		try {
			const req = await fetch(url);

			if (!req.ok) {
				throw new Error(`Error on check-service ${url}`);
			}

			const log = new LogEntity(
				LogSeverityLevel.low,
				`Server ${url} is working`,
			);

			this.logRepository.saveLog(log);
			this.successCallback();
			return true;
		} catch (error) {
			const log = new LogEntity(
				LogSeverityLevel.high,
				`Error message : ${error}`,
			);
			this.logRepository.saveLog(log);

			this.errorCallBack(`${error}`);
			return false;
		}
	}
}
