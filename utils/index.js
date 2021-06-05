const { 
	FINANCIAL_MODELING_GREP_API_KEY,
	FMPCLOUD_API_KEY,
	FMPCLOUD_BASE_URL,
	PORT 
} = require('./config');
const { getCompanyTickerFromURL } = require('./getCompanyTicker');

module.exports = {
	FINANCIAL_MODELING_GREP_API_KEY,
	FMPCLOUD_API_KEY,
	FMPCLOUD_BASE_URL,
	PORT,
	getCompanyTickerFromURL,
};
