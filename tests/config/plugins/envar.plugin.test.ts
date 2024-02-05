import { envs } from '../../../src/config/plugins/envar.plugin';
describe('envar.plugin.ts', () => {
	test('Should return env options', () => {
		expect(envs).toEqual({
			PORT: 3000,
			MAILER_EMAIL: 'fefito44@gmail.com',
			MAILER_SECRET_KEY: 'pqautvarzhnijvod',
			PROD: false,
			MONGO_URL: 'mongodb://federico:1234567@localhost:27017/',
			MONGO_DB_NAME: 'NOC_TEST',
			MONGO_USER: 'federico',
			MONGO_PASS: '1234567',
		});
	});
});
