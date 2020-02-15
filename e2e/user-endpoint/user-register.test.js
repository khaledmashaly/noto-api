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
			.set('Accept', 'application/json')
			.expect(201);
	});

	it('responds with 422 if email already exists', async () => {
		const newUser = {
			email: 'hello2@world.com',
			fullname: 'Hello World',
			password: 'helloworld',
			confirmPassword: 'helloworld'
		};

		await request(app)
			.post('/user')
			.send(newUser)
			.set('Accept', 'application/json')
			.expect(201);

		await request(app)
			.post('/user')
			.send(newUser)
			.set('Accept', 'application/json')
			.expect(422);
	});
});
