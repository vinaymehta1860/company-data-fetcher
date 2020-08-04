const { API_KEY, PORT } = require('./config');
const { getCompanyTickerFromURL } = require('./getCompanyTicker');

module.exports = {
	API_KEY,
	PORT,
	getCompanyTickerFromURL,
};
