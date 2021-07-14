const mongoose = require('mongoose');
const { DB_URL } = require('../../constants/App');

mongoose.connect(DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

module.exports = mongoose;