/**
 * Helper function to extract company ticker from request url
 * @param {String} url it should be something like '/company/<ticker>/<balanceSheet | incomeStatement | cashFlowStatement>/'
 * @returns {String} company ticker
 */
const getCompanyTickerFromURL = (url = '') => {
	if (url === '') {
		return null;
	}

	const parts = url.split('/');

	if (parts.length < 3) {
		return null;
	}

	return parts[2];
};

module.exports = {
	getCompanyTickerFromURL,
};
