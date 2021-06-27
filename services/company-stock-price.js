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

		const companyStockInformation = await fetchCompanyStockInformation(ticker);

		return sendSuccessResponse(response, {
			message: 'GO GO GO...!!!',
			payload: companyStockInformation,
		});
	} catch (e) {
		console.error(
			`There was an error while getting ${ticker}'s stock information. Error: ${error}`
		);

		return sendErrorResponse(response, {
			code: 411,
			message: 'Request failed.',
			payload: { error },
		});
	}
});

const fetchCompanyStockInformation = async (ticker) => {
	if (!ticker) {
		return null;
	}

	const requestURL = `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;

	try {
		const companyStockInformation = await axios.get(requestURL);

		return companyStockInformation.data;
	} catch (error) {
		console.error(
			`Error occured while fetching company's stock pricing information. Error desc: ${error}`
		);

		return error;
	}
};

module.exports = router;
