const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const tokenDecoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		req.token = tokenDecoded;
		if (tokenDecoded) next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid token' });
	} return null;
};