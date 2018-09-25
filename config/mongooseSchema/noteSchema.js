import { Schema } from 'mongoose';

const noteSchema = new Schema({
	title: { type: String, default: 'New note title' },
	body: { type: String, default: '' }
});

export default noteSchema;
