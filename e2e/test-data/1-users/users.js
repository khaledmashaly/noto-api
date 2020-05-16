import { PasswordHasher } from '../../../src/lib/utilities/password-hasher';

const testUserList = [
	{
		email: 'testuser1@noto.test',
		fullname: 'Test User 1',
		password: new PasswordHasher().hash('testuser1')
	},
	{
		email: 'testuser2@noto.test',
		fullname: 'Test User 2',
		password: new PasswordHasher().hash('testuser2')
	},
	{
		email: 'testuser3@noto.test',
		fullname: 'Test User 3',
		password: new PasswordHasher().hash('testuser3')
	}
];

export { testUserList };
