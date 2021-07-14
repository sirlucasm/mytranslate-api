const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../constants/App');

module.exports = {
	create: async (req, res) => {
		const { email } = req.body;
		try {
			if (await User.findOne({ email })) return res.status(400).json({ message: 'User already exists' });
			
			const user = await User.create(req.body);
			return res.status(201).json(user);
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	},

	authenticate: async (req, res) => {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email }).select('+password');
			if (!user) return res.status(400).json({ message: 'Your credentials are incorrect' });
			
			const passwordValidated = await bcrypt.compare(password, user.password);
			if (!passwordValidated) return res.status(400).json({ message: 'Your credentials are incorrect' });
			
			const token = jwt.sign({
				id: user._id,
				name: user.name,
				email: user.email
			}, process.env.JWT_PRIVATE_KEY, {
				expiresIn: '999 years'
			})

			return res.status(200).json({ token, user });
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	},

	authenticateAdmin: async (req, res) => {
		const { email, password } = req.body;
		try {
			if (!ADMIN_EMAIL || !email) return res.status(400).json({ message: 'Admin Email missing' });
			if (!ADMIN_PASSWORD || !password) return res.status(400).json({ message: 'Admin Password missing' });
			
			if (ADMIN_EMAIL != email || ADMIN_PASSWORD != password) return res.status(400).json({ message: 'Your credentials are incorrect' });
			
			const token = jwt.sign({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }, process.env.JWT_ADMIN_PRIVATE_KEY, {
				expiresIn: '1 day'
			})

			return res.status(200).json({ token });
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	},
}