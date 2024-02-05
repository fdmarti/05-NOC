import { LogModel } from '../../../../src/data/mongo/models/log.model';

describe('log.model.ts', () => {
	test('Should return a log model', () => {
		const newLogTest = new LogModel({
			level: 'low',
			origin: 'log.model.test.ts',
			message: 'test message',
		});

		expect(newLogTest).toEqual(
			expect.objectContaining({
				...newLogTest,
				id: expect.any(String),
				createdAt: expect.any(Date),
			}),
		);
	});
});
