import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImplementation } from '../infraestructure/repositories/log.repository';
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasource';

const fileSystemRepository = new LogRepositoryImplementation(
	new FileSystemDatasource(),
);

export class ServerApp {
	static start() {
		CronService.createJob('*/5 * * * * *', () => {
			new CheckService(
				() => console.log('Success'),
				(error) => console.log(error),
                fileSystemRepository
			).execute('http://localhost:8080/users');
		});
	}
}
