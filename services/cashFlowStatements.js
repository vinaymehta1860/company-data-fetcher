const axios = require('axios'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	router = express.Router();

// Router configuration
router.use(cors({ origin: 'http://localhost:4000' }), bodyParser.json());

const { API_KEY, getCompanyTickerFromURL } = require('../utils');

const baseURL =
	'https://financialmodelingprep.com/api/v3/financials/cash-flow-statement';

// Common utility functions for sending out responses
sendSuccessResponse = (responseObject = {}, options = {}) => {
	responseObject.send({
		success: true,
		code: 200,
		message: options.message || undefined,
		payload: options.payload || undefined,
	});
};

sendErrorResponse = (responseObject = {}, options = {}) => {
	responseObject.send({
		success: false,
		code: options.code || 404,
		message:
			options.message ||
			'There was some error while processing your request. For more information, please see server console.',
	});
};

router.get('/', async (request, response) => {
	const ticker = getCompanyTickerFromURL(request.baseUrl);

	const cashFlowStatements = await fetchCompanyCashFlowStatements(ticker);

	return sendSuccessResponse(response, {
		message: 'GO GO GO...!!!',
		payload: { cashFlowStatements },
	});
});

const fetchCompanyCashFlowStatements = async (ticker) => {
	const requestURL = baseURL + `/${ticker}?period=quarter&apikey=${API_KEY}`;

	try {
		const cashFlowStatements = await axios.get(requestURL);

		return cashFlowStatements.data;
	} catch (error) {
		console.log(
			`Error occured while fetching company's cash flow statements. Error desc: ${error}`
		);
		return null;
	}
};

module.exports = router;
