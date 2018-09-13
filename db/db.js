import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/';
const db = 'noto';
const col = 'notes';
const options = {
	useNewUrlParser: true
};

export const findAll = () => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, options)
			.then(client => {
				client.db(db).collection(col)
					.find({}).toArray()
						.then(docs => {
							resolve(docs);
						})
						.catch(e => reject(e));
				client.close();
			})
			.catch(e => reject(e));
	});
};

export const findOne = doc => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, options)
			.then(client => {
				client.db(db).collection(col)
					.findOne(doc)
					.then(doc => {
						resolve(doc);
					})
					.catch(e => reject(e));
				client.close();
			})
			.catch(e => reject(e));
	});
};

export const deleteOne = doc => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, options)
			.then(client => {
				client.db(db).collection(col)
					.deleteOne(doc)
					.then(doc => {
						resolve(doc);
					})
					.catch(e => reject(e));
				client.close();
			})
			.catch(e => reject(e));
	});
};

export const updateOne = (doc, update) => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, options)
			.then(client => {
				client.db(db).collection(col)
					.updateOne(doc, update)
					.then(doc => {
						resolve(doc);
					})
					.catch(e => reject(e));
				client.close();
			})
			.catch(e => reject(e));
	});
};

export const insertOne = doc => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, options)
			.then(client => {
				client.db(db).collection(col)
					.insertOne(doc)
					.then(({ insertedId }) => {
						resolve(insertedId);
					})
					.catch(e => reject(e));
				client.close();
			})
			.catch(e => reject(e));
	});
};
