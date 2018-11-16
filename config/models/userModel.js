import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	key: String,
	salt: String,
	iter: {
		type: Number,
		default: 100000
	},
	keyLen: {
		type: Number,
		default: 256
	}
});

userSchema.methods.setPassword = function(password) {
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
};

userSchema.methods.checkPassword = function(password) {
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
};

userSchema.methods.generateToken = function() {
	return new Promise((resolve, reject) => {
		const payload = {
			id: this.id,
			email: this.email
		};
		const cb = (err, token) => {
			if (err) reject(err);
			resolve(token);
		};
		jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '7d'
		}, cb);
	});
};

mongoose.model('User', userSchema);
