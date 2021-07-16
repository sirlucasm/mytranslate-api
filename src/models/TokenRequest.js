const mongoose = require('../configs/database');
const { STATUS } = require('../constants/TokenRequest');

const { Schema } = mongoose;

const TokenRequestSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: false,
		default: STATUS.PENDING
	},
	reason: {
		type: String,
		required: false,
	},
	token: {
		type: String,
		required: false,
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const TokenRequest = mongoose.model('TokenRequest', TokenRequestSchema);

module.exports = TokenRequest;