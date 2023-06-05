const axios = require('axios'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	router = express.Router(),
	{ getCompanyTickerFromURL } = require('../utils'),
	{ sendSuccessResponse, sendErrorResponse } = require('./common'),
	{ ALPHA_VANTAGE_API_KEY, ALPHA_VANTAGE_BASE_URL } = require("../config");

// Router configuration
router.use(cors({ origin: ['http://localhost:4000'] }), bodyParser.json());

router.get('/', async (request, response) => {
	try {
		const ticker = getCompanyTickerFromURL(request.baseUrl);

		const companyData = await fetchCompanyData(ticker);

		return sendSuccessResponse(response, {
			message: 'GO GO GO...!!!',
			payload: companyData,
		});
	} catch (e) {
		console.error(
			`There was an error while getting ${ticker}'s information. Error: ${error}`
		);

		return sendErrorResponse(response, {
			code: 411,
			message: 'Request failed.',
			payload: { error },
		});
	}
});

const fetchCompanyData = async (ticker) => {
	if (!ticker) {
		return null;
	}

	const requestURL = `${ALPHA_VANTAGE_BASE_URL}?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;

	try {
		const companyData = await axios.get(requestURL);

		return companyData.data;
	} catch (error) {
		console.error(
			`Error occured while fetching company's data. Error desc: ${error}`
		);

		return error;
	}
};

module.exports = router;
