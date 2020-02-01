/**
 * checks for crud permissions
 */
class AccessController {
	constructor() {}

	canRead(user, entity) {
		return this.owns(user, entity);
	}

	canAdd(user) {
		return true;
	}

	canDelete(user, entity) {
		return this.owns(user, entity);
	}

	canEdit(user, entity) {
		return this.owns(user, entity);
	}

	/**
	 * checks if a user possesses a certain entity
	 * @param {object} user an express user object
	 * @param {object} entity mongoose document
	 * @return {boolean} true if user possesses the entity
	 * @private
	 */
	owns(user, entity) {
		return user._id.toString() === entity.ownerId.toString();
	}
}

export default AccessController;
