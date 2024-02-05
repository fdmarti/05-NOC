import mongoose from 'mongoose';
import { MongoDataBase } from '../../../src/data/mongo/init';

describe('mongo/init.ts', () => {
	afterAll(() => {
		mongoose.connection.close();
	});
	test('Should connect to MongoDB', async () => {
		const mongoConnectionStatus = await MongoDataBase.connect({
			mongoUrl: `${process.env.MONGO_URL}`,
			dbName: `${process.env.MONGO_DB_NAME}`,
		});

		expect(mongoConnectionStatus).toBeTruthy();
	});

	test('Should thrown an error', async () => {
		try {
			const mongoConnectionStatus = await MongoDataBase.connect({
				mongoUrl: `fake-mongo-url`,
				dbName: `fake-db-name`,
			});
			expect(true).toBeFalsy();
		} catch (error) {}
	});
});
