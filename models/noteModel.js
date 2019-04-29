import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		default: 'New note title'
	},
	body: {
		type: String,
		default: ''
	},
	ownerId: {
		type: String,
		required: true,
		select: false
	}
});

mongoose.model('Note', noteSchema);
