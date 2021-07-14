const Languages = require('../configs/languages.json');
const TranslateService = require('../services/TranslateService');
const { APP_NAME, APP_LANGUAGE } = require('../constants/App');

module.exports = {
	index: (__, res) => {
		return res.json({
			message: `Welcome to ${APP_NAME}`,
			online: true
		});
	},

	getLanguages: async (req, res) => {
		try {
			return res.json(Languages);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},

	translate: async (req, res) => {
		try {
			const params = req.body;
			params.language = params.language || APP_LANGUAGE;
			params.text = params.text.replace(' ', '%20');

			const translate = await TranslateService.translate(params);
			
			return res.json(translate);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}