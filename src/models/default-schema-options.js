/*
	check this link for all available options and their meaning
	https://mongoosejs.com/docs/guide.html#options
*/

const defaultSchemaOptions = {
	// auto-assign creation and last-update dates to schemas
	timestamps: {
		// name of creation date field
		createdAt: 'createdAt',
		// name of last-update date field
		updatedAt: 'updatedAt'
	}
};

export default defaultSchemaOptions;
