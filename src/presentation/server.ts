import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';

export class ServerApp {
	static start() {
		CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    () => console.log('Success'),
                    (error => console.log(error))
                ).execute('http://localhost:8080/users')
            }
        );
	}
}
