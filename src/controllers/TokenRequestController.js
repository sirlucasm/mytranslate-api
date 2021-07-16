const TokenRequest = require('../models/TokenRequest');
const { APP_URL, APP_PORT } = require('../constants/App');
const { STATUS } = require('../constants/TokenRequest');

module.exports = {
	request: async (req, res) => {
		const { email, reason } = req.query;
		try {
			if (await TokenRequest.findOne({ email })) return res.status(400).json({ message: 'Token request already sent.' });
			
			const url = process.env.NODE_ENV !== 'production' ? `${APP_URL}:${APP_PORT}` : APP_URL;
			const tokenRequest = await TokenRequest.create(req.query);
			return res.status(201).json({
				request: {
					code: tokenRequest.id,
					email: tokenRequest.email,
					name: tokenRequest.name,
					status: tokenRequest.status,
					reason: tokenRequest.reason,
					token: tokenRequest.token,
					url: `${url}/token-request/my?code=${tokenRequest.id}`
				},
				message: 'Token request sended successfully'
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
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
				name: tokenRequest.name,
				status: tokenRequest.status,
				reason: tokenRequest.reason,
				token: tokenRequest.token ? tokenRequest.token : 'wait admin accept your request',
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	adminResponse: async (req, res) => {
		const { code } = req.query;
		const { token, reason } = req.body;
		try {
			const tokenRequest = await TokenRequest.findOne({ _id: code });
			if (!tokenRequest) return res.status(404).json({ message: 'Token request does not exist.' });
			
			if (token) await TokenRequest.updateOne({ token, status: STATUS.ACTIVE }).where({ _id: code })
			else if (reason) await TokenRequest.updateOne({ reason, status: STATUS.REJECTED }).where({ _id: code })
			
			return res.status(200).json({ message: `Token sended to '${tokenRequest.email}' account` });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	requests: async (req, res) => {
		const { status } = req.query;
		try {
			const tokenRequest = await TokenRequest.find({ status }).sort({ createdAt: -1 });
			if (tokenRequest.length <= 0) return res.status(404).json({ message: 'Nothing to show' });

			return res.status(200).json(tokenRequest);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
}