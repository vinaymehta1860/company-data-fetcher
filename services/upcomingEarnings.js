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
		const upcomingEarnings = await fetchEarningsCalendar(request.query.period || 3);

		return sendSuccessResponse(response, {
			message: 'GO GO GO...!!!',
			payload: upcomingEarnings,
		});
	} catch (error) {
		console.error(
			`There was an error while getting earnigns calendar. Error: ${error}`
		);

		return sendErrorResponse(response, {
			code: 411,
			message: 'Request failed.',
			payload: { error },
		});
	}
});

const fetchEarningsCalendar = async (period) => {
	const requestURL = `${ALPHA_VANTAGE_BASE_URL}?function=EARNINGS_CALENDAR&horizon=${period}month&apikey=${ALPHA_VANTAGE_API_KEY}`;

	try {
		const upcomingEarnings = await axios.get(requestURL);

		return upcomingEarnings.data;
	} catch (error) {
		console.log(
			`Error occured while fetching earnings calendar. Error desc: ${error}`
		);
		return error;
	}
};

router.get('/:ticker', async (request, response) => {
	try {
		const earningsDateForCompany = await fetchEarningsCalendarForCompany(request.params.ticker);

		return sendSuccessResponse(response, {
			message: 'GO GO GO...!!!',
			payload: { earningsDateForCompany },
		});
	} catch (error) {
		console.error(
			`There was an error while getting earnigns calendar. Error: ${error}`
		);

		return sendErrorResponse(response, {
			code: 411,
			message: 'Request failed.',
			payload: { error },
		});
	}
});

const fetchEarningsCalendarForCompany = async (ticker) => {
	const requestURL = `${ALPHA_VANTAGE_BASE_URL}?function=EARNINGS_CALENDAR&symbol=${ticker}&horizon=3month&apikey=${ALPHA_VANTAGE_API_KEY}`;

	try {
		const earningsDateForCompany = await axios.get(requestURL);

		return earningsDateForCompany.data;
	} catch (error) {
		console.log(
			`Error occured while fetching earnings calendar. Error desc: ${error}`
		);
		return error;
	}
};

module.exports = router;
