import { ServerApp } from './presentation/server';
import { envs } from './config/plugins/envar.plugin';

(async () => {
	await main();
})();

function main() {
	// ServerApp.start();

	const email: string = envs.MAILER_EMAIL
	console.log({email})

}
