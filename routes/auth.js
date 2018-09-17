import { Router } from 'express';

const authRouter = new Router();

authRouter.route('/')
	.post(function(req, res) {
		console.log(req.body);
	});

export default authRouter;
