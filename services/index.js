const { request } = require('express');

const balanceSheetRouter = require('./balanceSheets');
const incomeStatementRouter = require('./incomeStatements');
const cashFlowStatementRouter = require('./cashFlowStatements');
const earningsCalendarRouter = require('./upcomingEarnings');

module.exports = {
	balanceSheetRouter,
	cashFlowStatementRouter,
	incomeStatementRouter,
	earningsCalendarRouter,
};
