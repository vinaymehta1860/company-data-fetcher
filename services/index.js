const { request } = require('express');

const balanceSheetRouter = require('./balanceSheets');
const incomeStatementRouter = require('./incomeStatements');
const cashFlowStatementRouter = require('./cashFlowStatements');

module.exports = {
	balanceSheetRouter,
	cashFlowStatementRouter,
	incomeStatementRouter,
};
