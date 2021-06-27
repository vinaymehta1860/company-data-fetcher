const companyInfo = require('./companyInfo');
const companyStats = require('./company-stats');
const companyStockPrice = require('./company-stock-price');
const balanceSheetRouter = require('./balanceSheets');
const incomeStatementRouter = require('./incomeStatements');
const cashFlowStatementRouter = require('./cashFlowStatements');
const earningsCalendarRouter = require('./upcomingEarnings');
const IPOCalendarRouter = require('./ipoCalendar');

module.exports = {
	companyInfo,
	companyStats,
	companyStockPrice,
	balanceSheetRouter,
	cashFlowStatementRouter,
	incomeStatementRouter,
	earningsCalendarRouter,
	IPOCalendarRouter
};
