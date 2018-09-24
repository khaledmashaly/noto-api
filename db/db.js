import mongoose from 'mongoose';

const dburl = 'mongodb://localhost:27017/noto';
const Schema = mongoose.Schema;

mongoose.connect(dburl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'connection open'));

const noteSchema = new Schema({
	// TODO: introduce maxlength properties
	title: { type: String, default: 'New note title' },
	body: { type: String, default: '' }
});

export const Note = mongoose.model('Note', noteSchema);
