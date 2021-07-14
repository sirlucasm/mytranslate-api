const mongoose = require('../configs/database');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		select: false,
		required: true,
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;