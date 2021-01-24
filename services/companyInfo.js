const axios = require('axios'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	router = express.Router();

// Router configuration
router.use(cors({ origin: 'http://localhost:4000' }), bodyParser.json());

const {
	IEX_API_KEY,
	IEX_BASE_URL,
	getCompanyTickerFromURL,
} = require('../utils');
const { sendSuccessResponse, sendErrorResponse } = require('./common');

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
	const requestURL =
		IEX_BASE_URL + `/stock/${ticker}/company?token=${IEX_API_KEY}`;

	try {
		const companyData = await axios.get(requestURL);

		return companyData.data;
	} catch (error) {
		console.log(
			`Error occured while fetching company's data. Error desc: ${error}`
		);

		return error;
	}
};

module.exports = router;
