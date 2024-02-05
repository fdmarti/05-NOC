import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImplementation } from '../infraestructure/repositories/log.repository';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-log';
import { MongoLogDataSource } from '../infraestructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infraestructure/datasources/postgres-log.datasource';
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';

const logRepository = new LogRepositoryImplementation(
	new FileSystemDatasource(),
	// new MongoLogDataSource(),
	// new PostgresLogDataSource(),
);

const emailService = new EmailService();

export class ServerApp {
	static async start() {
		console.log('Server started...');

		// new SendEmailLogs(emailService, logRepository).execute(
		// 	'fefito44@gmail.com',
		// );

		// emailService.sendEmailWithFileSystemLogs('fefito44@gmail.com');

		// CronService.createJob('*/5 * * * * *', () => {
		// 	new CheckService(
		// 		() => console.log('Success Log'),
		// 		(error) => console.log(error),
		// 		logRepository,
		// 	).execute('https://google.com/');
		// });

		const fileSystemDataSource = new FileSystemDatasource();
		const logs = await fileSystemDataSource.getLogs(LogSeverityLevel.low);
		// console.log({logs});
	}
}
