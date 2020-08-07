const axios = require('axios'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	router = express.Router();

// Router configuration
router.use(cors({ origin: 'http://localhost:4000' }), bodyParser.json());

const { API_KEY } = require('../utils');
const { sendSuccessResponse, sendErrorResponse } = require('./common');

const baseURL = 'https://financialmodelingprep.com/api/v3/earning_calendar';

router.get('/', async (request, response) => {
	try {
		const upcomingEarnings = await fetchEarningsCalendar();

		return sendSuccessResponse(response, {
			message: 'GO GO GO...!!!',
			payload: { upcomingEarnings },
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

const fetchEarningsCalendar = async () => {
	const requestURL = baseURL + `?apikey=${API_KEY}`;
	console.log(`URI: ${requestURL}`);
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

module.exports = router;
