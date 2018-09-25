import mongoose from 'mongoose';
import noteSchema from './mongooseSchema/noteSchema';

const dburl = 'mongodb://localhost:27017/noto';

mongoose.connect(dburl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'connection open'));

export const Note = mongoose.model('Note', noteSchema);
