import mongoose from 'mongoose';
import crypto from 'crypto';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: String
});

/* userSchema.methods.setPassword = function(password) {
	return new Promise((resolve, reject) => {
		const loginUser = (err, key) => {
			if (err) reject(err);
			this.key = key.toString('hex');
			resolve();
		};

		const calculateHash = (err, salt) => {
			if (err) reject(err);
			this.salt = salt.toString('hex');
			crypto.pbkdf2(password, this.salt, this.iter, this.keyLen, 'sha512', loginUser);
		};

		crypto.randomBytes(16, calculateHash);
	});
}; */

userSchema.methods.setPassword = async function(password) {
	this.password = await argon2.hash(password);
};

/* userSchema.methods.checkPassword = function(password) {
	return new Promise((resolve, reject) => {
		const compareKeys = (err, generatedkey) => {
			if (err) reject(err);
			const savedKey = Buffer.from(this.key, 'hex');
			let isValid;
			try {
				isValid = crypto.timingSafeEqual(savedKey, generatedkey);
			}
			catch (err) {
				reject(err);
			}
			resolve(isValid);
		};
		crypto.pbkdf2(password, this.salt, this.iter, this.keyLen, 'sha512', compareKeys);
	});
}; */

userSchema.methods.checkPassword = async function(password) {
	return await argon2.verify(this.password, password);
};

mongoose.model('User', userSchema);
