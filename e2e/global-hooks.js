import { before, after, afterEach } from 'mocha';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import sinon from 'sinon';

let mongod;

const dropCollections = async () => {
	const collections = await mongoose.connection.db.collections();
	collections.forEach(async (collection) => {
		await collection.deleteMany();
	});
};

before(async () => {
	// spawn a new in-memory mongo instance
	mongod = new MongoMemoryServer();
	const mongoUri = await mongod.getUri();

	if (!mongod.getInstanceInfo()) {
		throw new Error('couldn\'t spawn a mongo instance');
	}

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true
	});

	// drop collections to force creation of indices
	await dropCollections();
});

afterEach(async () => {
	await dropCollections();
	// restore all sinon stubs
	sinon.restore();
});

after(async () => {
	// stop mongoose connection
	await mongoose.disconnect();
	// stop mongo instance
	await mongod.stop();
});
