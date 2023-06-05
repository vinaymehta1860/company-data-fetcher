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
		const ipoCalendar = await fetchIPOCalendar();

		return sendSuccessResponse(response, {
			message: 'GO GO GO...!!!',
			payload: ipoCalendar,
		});
	} catch (error) {
		console.error(
			`There was an error while getting IPO calendar. Error: ${error}`
		);

		return sendErrorResponse(response, {
			code: 411,
			message: 'Request failed.',
			payload: { error },
		});
	}
});

const fetchIPOCalendar = async () => {
	const requestURL = `${ALPHA_VANTAGE_BASE_URL}?function=IPO_CALENDAR&apikey=${ALPHA_VANTAGE_API_KEY}`;

	try {
		const ipoCalendar = await axios.get(requestURL);

		return ipoCalendar.data;
	} catch (error) {
		console.log(
			`Error occured while fetching IPO calendar. Error desc: ${error}`
		);
		return error;
	}
};

module.exports = router;
