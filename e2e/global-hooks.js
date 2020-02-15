import { beforeEach, afterEach } from 'mocha';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import sinon from 'sinon';

let mongod;

beforeEach(async () => {
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
});

afterEach(async () => {
	// stop mongoose connection
	await mongoose.disconnect();
	// stop mongo instance
	await mongod.stop();
	// restore all sinon stubs
	sinon.restore();
});
