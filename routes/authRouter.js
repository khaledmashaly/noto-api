import { Router } from 'express';
import passport from 'passport';
import auth from '../config/jwt';
import mongoose from 'mongoose';
const User = mongoose.model('User');

const authRouter = new Router();

authRouter.route('/register')
	.post(async (req, res) => {
		try {
			const user = new User({
				email: req.body.email
			});
			await user.setPassword(req.body.password);
			await user.save();
			const token = await user.generateToken();
			res.status(200).json({ token });
		}
		catch (err) {
			res.status(500).json(err);
		}
	});

authRouter.route('/login')
	.post((req, res) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				res.status(404).json(err);
				return;
			}

			if (user) {
				user.generateToken()
					.then(token => {
						res.status(200).json({ token });
					})
					.catch(err => {
						res.status(500).json(err);
					});
			}
			else {
				res.status(401).json(info);
			}
		})(req, res);
	});

authRouter.route('/profile')
	.get(auth, (req, res) => {
		console.log('inside profile route, req.payload:', req.payload);
		if (!req.payload.id) {
			res.status(401).json({
				message: 'UnauthorizedError: private profile'
			});
		}
		else {
			User.findById(req.payload.id).exec()
				.then(user => {
					console.log('user in profile route:', user);
					res.status(200).json(user);
				})
				.catch(err => res.status(401).json(err));
		}
	});

export default authRouter;
