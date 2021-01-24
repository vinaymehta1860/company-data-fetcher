const { API_KEY, IEX_API_KEY, IEX_BASE_URL, PORT } = require('./config');
const { getCompanyTickerFromURL } = require('./getCompanyTicker');

module.exports = {
	API_KEY,
	IEX_API_KEY,
	IEX_BASE_URL,
	PORT,
	getCompanyTickerFromURL,
};
