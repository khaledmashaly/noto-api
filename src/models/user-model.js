import mongoose from 'mongoose';
import argon2 from 'argon2';

import { defaultSchemaOptions } from './default-schema-options';

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

userSchema.methods.setPassword = async function(password) {
	this.password = await argon2.hash(password);
};

userSchema.methods.checkPassword = async function(password) {
	return await argon2.verify(this.password, password);
};

export const UserModel = mongoose.model('User', userSchema);
