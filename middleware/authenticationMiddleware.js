import AuthenticationError from '../errors/AuthenticationError';

const authenticationMiddleware = (req, res, next) => {
	// allow login and register requests to be unauthenticated
	if (
		(req.path === '/login' || req.path === '/user')
		&&
		req.method === 'POST'
	) {
		return next();
	}
	// else if user is authenticated continue
	if (req.user) {
		return next();
	}
	// otherwise throw an authentication error
	return next(new AuthenticationError('please login'));
};

export default authenticationMiddleware;
