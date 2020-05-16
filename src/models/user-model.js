import mongoose from 'mongoose';

import { defaultSchemaOptions } from './default-schema-options';
import { PasswordHasher } from '../lib/utilities/password-hasher';

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'email is required'],
			unique: true
		},
		password: {
			type: String,
			required: [true, 'password is required']
		},
		fullname: {
			type: String,
			required: [true, 'fullname is required']
		}
	},
	{
		...defaultSchemaOptions
	}
);

userSchema.methods.setPassword = async function(plainPassword) {
	this.password = await new PasswordHasher().hash(plainPassword);
};

userSchema.methods.checkPassword = async function(plainPassword) {
	return await new PasswordHasher().verify(this.password, plainPassword);
};

export const UserModel = mongoose.model('User', userSchema);
