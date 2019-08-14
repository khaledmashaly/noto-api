import HttpError from '../errors/HttpError';

const authenticationMiddleware = (req, res, next) => {
	// allow login and register requests to be unauthenticated
	if (
		(req.path === '/login' || req.path === '/user')
		&&
		req.method === 'POST'
	) {
		next();
	}
	else {
		// if user is authenticated continue
		if (req.user) {
			next();
		}
		// otherwise throw an authentication error
		else {
			next(new HttpError('Authentication Error', 403));
		}
	}
};

export default authenticationMiddleware;
