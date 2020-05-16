import argon2 from 'argon2';

/**
 * A utility class that wraps the algorithm used to hash user passwords, so
 * that application is not tightly coupled to a specific algorithm or library.
 */
export class PasswordHasher {
	/**
	 * PasswordHasher is a singleton, it uses argon2 library to hash passwords.
	 */
	constructor() {
		if (!PasswordHasher._instance) {
			this._argon2 = argon2;
			PasswordHasher._instance = this;
		}
		return PasswordHasher._instance;
	}

	/**
	 * converts a plain password to a hash
	 * @param {string} password a string containing plain password to hash
	 * @return {string} hashed password
	 */
	async hash(password) {
		return await argon2.hash(password);
	}

	/**
	 * verifies a password against a given hash
	 * @param {string} hash a hash to compare to
	 * @param {string} password a plain password to verify against given hash
	 * @return {boolean} true if password matches hash, false otherwise
	 */
	async verify(hash, password) {
		return await argon2.verify(hash, password);
	}
}
