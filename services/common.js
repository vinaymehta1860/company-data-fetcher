// Common utility functions for sending out responses
const sendSuccessResponse = (responseObject = {}, options = {}) => {
	responseObject.send({
		success: true,
		code: 200,
		message: options.message || undefined,
		payload: options.payload || undefined,
	});
};

const sendErrorResponse = (responseObject = {}, options = {}) => {
	responseObject.send({
		success: false,
		code: options.code || 404,
		message:
			options.message ||
			'There was some error while processing your request. For more information, please see server console.',
	});
};

module.exports = {
	sendSuccessResponse,
	sendErrorResponse,
};
