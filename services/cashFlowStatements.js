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

		const cashFlowStatements = await fetchCompanyCashFlowStatements(ticker);

		return sendSuccessResponse(response, {
			message: 'GO GO GO...!!!',
			payload: cashFlowStatements,
		});
	} catch (error) {
		console.error(
			`There was an error while getting ${ticker}'s cash flow statements. Error: ${error}`
		);

		return sendErrorResponse(response, {
			code: 411,
			message: 'Request failed.',
			payload: { error },
		});
	}
});

const fetchCompanyCashFlowStatements = async (ticker) => {
	const requestURL = `${ALPHA_VANTAGE_BASE_URL}?function=CASH_FLOW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`

	try {
		const cashFlowStatements = await axios.get(requestURL);

		return cashFlowStatements.data;
	} catch (error) {
		console.log(
			`Error occured while fetching company's cash flow statements. Error desc: ${error}`
		);
		return error;
	}
};

module.exports = router;
