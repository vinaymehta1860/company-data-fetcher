const axios = require('axios'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	router = express.Router();

// Router configuration
router.use(cors({ origin: ['http://localhost:4000'] }), bodyParser.json());

const {
	ALPHA_VANTAGE_API_KEY,
	ALPHA_VANTAGE_BASE_URL,
	getCompanyTickerFromURL
} = require('../utils');
const { sendSuccessResponse, sendErrorResponse } = require('./common');

router.get('/', async (request, response) => {
	try {
		const ticker = getCompanyTickerFromURL(request.baseUrl);

		const incomeStatements = await fetchCompanyIncomeStatements(ticker);

		return sendSuccessResponse(response, {
			message: 'GO GO GO...!!!',
			payload: incomeStatements,
		});
	} catch (error) {
		console.error(
			`There was an error while getting ${ticker}'s income statements. Error: ${error}`
		);

		return sendErrorResponse(response, {
			code: 411,
			message: 'Request failed.',
			payload: { error },
		});
	}
});

const fetchCompanyIncomeStatements = async (ticker) => {
	const requestURL = `${ALPHA_VANTAGE_BASE_URL}?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`

	try {
		const incomeStatements = await axios.get(requestURL);

		return incomeStatements.data;
	} catch (error) {
		console.log(
			`Error occured while fetching company's income statements. Error desc: '${error}'`
		);
		return error;
	}
};

module.exports = router;
