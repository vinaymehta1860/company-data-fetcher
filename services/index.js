const companyInfo = require('./companyInfo');
const companyStats = require('./company-stats');
const balanceSheetRouter = require('./balanceSheets');
const incomeStatementRouter = require('./incomeStatements');
const cashFlowStatementRouter = require('./cashFlowStatements');
const earningsCalendarRouter = require('./upcomingEarnings');

module.exports = {
	companyInfo,
	companyStats,
	balanceSheetRouter,
	cashFlowStatementRouter,
	incomeStatementRouter,
	earningsCalendarRouter,
};
