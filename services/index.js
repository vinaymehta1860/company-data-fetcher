const companyInfo = require('./companyInfo');
const balanceSheetRouter = require('./balanceSheets');
const incomeStatementRouter = require('./incomeStatements');
const cashFlowStatementRouter = require('./cashFlowStatements');
const earningsCalendarRouter = require('./upcomingEarnings');

module.exports = {
	companyInfo,
	balanceSheetRouter,
	cashFlowStatementRouter,
	incomeStatementRouter,
	earningsCalendarRouter,
};
