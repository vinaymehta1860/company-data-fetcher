const axios = require('axios'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	router = express.Router();

// Router configuration
router.use(cors({ origin: 'http://localhost:4000' }), bodyParser.json());

const {
	FMPCLOUD_API_KEY,
	FMPCLOUD_BASE_URL,
	getCompanyTickerFromURL,
} = require('../utils');
const { sendSuccessResponse, sendErrorResponse } = require('./common');

router.get('/', async (request, response) => {
  try {
    const ticker = getCompanyTickerFromURL(request.baseUrl);

    const companyStats = await fetchCompanyStats(ticker);

    return sendSuccessResponse(response, {
      message: 'Hurray.!',
      payload: companyStats[0]
    });
  } catch (error) {
    console.error(`There was an error while fetching stats for ${ticker}. Please check server console for more details. Error: ${error}`);

    return sendErrorResponse(response, {
      code: 411,
      message: 'Request failed.',
      payload: { 
        errorDescription: `There was an error while fetching stats for ${ticker}. Please check server console for more details. Error: ${error}`
      }
    });
  }
});

const fetchCompanyStats = async (ticker) => {
  if (!ticker) {
    return null;
  }

  const requestURL = `${FMPCLOUD_BASE_URL}/quote/${ticker}?apikey=${FMPCLOUD_API_KEY}`;

  try {
    const companyStats = await axios.get(requestURL);

    return companyStats.data;
  } catch (error) {
    console.error(`There was an error while fetching stats for ${ticker}. Please check server console for more details. Error: ${error}`);

    return error;
  }
};

module.exports = router;
