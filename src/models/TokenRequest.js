const mongoose = require('../configs/database');

const { Schema } = mongoose;

const TokenRequestSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	reason: {
		type: String,
		required: false,
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const TokenRequest = mongoose.model('TokenRequest', TokenRequestSchema);

module.exports = TokenRequest;