import 'dotenv/config';
import { describe, it } from 'mocha';
import request from 'supertest';

import { app } from '../../src/app';

describe('POST /user', () => {
	it('responds with 201 on sucess', async () => {
		const newUser = {
			email: 'hello2@world.com',
			fullname: 'Hello World',
			password: 'helloworld',
			confirmPassword: 'helloworld'
		};

		await request(app)
			.post('/user')
			.send(newUser)
			.expect(201);
	});

	it('fails when email is not unique', async () => {
		const newUser = {
			email: 'hello2@world.com',
			fullname: 'Hello World',
			password: 'helloworld',
			confirmPassword: 'helloworld'
		};

		await request(app)
			.post('/user')
			.send(newUser)
			.expect(201);

		await request(app)
			.post('/user')
			.send(newUser)
			.expect(422);
	});
});
