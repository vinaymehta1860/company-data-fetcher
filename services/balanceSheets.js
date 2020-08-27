const axios = require('axios'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	router = express.Router();

// Router configuration
router.use(cors({ origin: 'http://localhost:4000' }), bodyParser.json());

const { API_KEY, getCompanyTickerFromURL } = require('../utils');
const { sendSuccessResponse, sendErrorResponse } = require('./common');

const baseURL =
	'https://financialmodelingprep.com/api/v3/balance-sheet-statement';

router.get('/', async (request, response) => {
	try {
		const ticker = getCompanyTickerFromURL(request.baseUrl);

		const balanceSheets = await fetchCompanyBalanceSheets(ticker);

		return sendSuccessResponse(response, {
			message: 'GO GO GO...!!!',
			payload: { balanceSheets },
		});
	} catch (error) {
		console.error(
			`There was an error while getting ${ticker}'s balance sheets. Error: ${error}`
		);

		return sendErrorResponse(response, {
			code: 411,
			message: 'Request failed.',
			payload: { error },
		});
	}
});

const fetchCompanyBalanceSheets = async (ticker) => {
	const requestURL = baseURL + `/${ticker}?period=quarter&apikey=${API_KEY}`;

	try {
		const balanceSheets = await axios.get(requestURL);

		return balanceSheets.data;
	} catch (error) {
		console.log(
			`Error occured while fetching company's balance sheet. Error desc: ${error}`
		);
		return error;
	}
};

module.exports = router;
