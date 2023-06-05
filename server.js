const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const app = express();

app.use((request, response, next) => {
	cors();
	next();
});

// Import other services here
const {
	companyInfo,
	// companyStats,
	companyStockPrice,
	balanceSheetRouter,
	cashFlowStatementRouter,
	incomeStatementRouter,
	earningsCalendarRouter,
	IPOCalendarRouter
} = require('./services');

// Individual statement mapping
app.use('/company/:ticker', companyInfo);
// app.use('/company/:ticker/stats', companyStats);
app.use('/company/:ticker/stock', companyStockPrice);
app.use('/company/:ticker/balancesheet', balanceSheetRouter);
app.use('/company/:ticker/incomestatement', incomeStatementRouter);
app.use('/company/:ticker/cashflowstatement', cashFlowStatementRouter);
app.use('/earningscalendar', earningsCalendarRouter);
app.use('/ipocalendar', IPOCalendarRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
