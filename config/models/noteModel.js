import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
	title: { type: String, default: 'New note title' },
	body: { type: String, default: '' }
});

mongoose.model('Note', noteSchema);
