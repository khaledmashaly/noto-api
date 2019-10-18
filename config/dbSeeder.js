import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/userModel';

const seedDB = async () => {
	try {
		await mongoose.connect(process.env.NOTO_DB_URL, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true
		});

		const userCount = await User.countDocuments().exec();

		if (userCount === 0) {
			console.log('dbSeeder.js: no users in database');
			console.log('dbSeeder.js: seeding admin user...');

			const admin = new User({
				email: process.env.NOTO_ADMIN_EMAIL,
				fullname: process.env.NOTO_ADMIN_FULLNAME
			});

			await admin.setPassword(process.env.NOTO_ADMIN_PASSWORD);

			await admin.save();

			console.log('dbSeeder.js: successfully seeded admin user...');
		}
		else {
			console.log('dbSeeder.js: there are users in database');
			console.log('dbSeeder.js: will not seed admin user');
		}

		await mongoose.connection.close();

		process.exit(0);
	}
	catch (e) {
		console.log(e);
		process.exit(1);
	}
};

seedDB();
