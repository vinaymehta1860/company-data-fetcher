const express = require('express');
const cors = require('cors');
const { PORT } = require('./utils');
const app = express();

app.use((request, response, next) => {
	cors();
	next();
});

// Import other services here
const {
	balanceSheetRouter,
	cashFlowStatementRouter,
	incomeStatementRouter,
} = require('./services');

// Individual statement mapping
app.use('/company/:ticker/balanceSheet', balanceSheetRouter);
app.use('/company/:ticker/incomeStatement', incomeStatementRouter);
app.use('/company/:ticker/cashFlowStatement', cashFlowStatementRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
