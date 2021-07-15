const TokenRequest = require('../models/TokenRequest');
const { APP_URL, APP_PORT } = require('../constants/App');

module.exports = {
	request: async (req, res) => {
		const { email, reason } = req.query;
		try {
			if (await TokenRequest.findOne({ email })) return res.status(400).json({ message: 'Token request already sent.' });
			
			const url = process.env.NODE_ENV !== 'production' ? `${APP_URL}:${APP_PORT}` : APP_URL;
			const tokenRequest = await TokenRequest.create(req.query);
			return res.status(201).json({
				data: {
					code: tokenRequest.id,
					email: tokenRequest.email,
					reason: tokenRequest.reason,
					url: `${url}/token-request/my?code=${tokenRequest.id}`
				},
				message: 'Token request sended successfully'
			});
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	},

	findMyRequest: async (req, res) => {
		const { code } = req.query;
		try {
			const tokenRequest = await TokenRequest.findOne({ _id: code });
			if (!tokenRequest) return res.status(404).json({ message: 'Token request does not exist.' });
			
			return res.status(200).json({
				code: tokenRequest.id,
				email: tokenRequest.email,
				reason: tokenRequest.reason,
			});
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	},
}