# company-data-fetcher
This is a backend service which gathers company's financial data from [Financial Modeling Prep](https://financialmodelingprep.com/) website.
This is basically used as a micro-service to fetch company's balance sheets, income and cash flow statements if not already present in database.

### Endpoints supported:
- GET `/company/<ticker>/balanceSheet`
- GET `/company/<ticker>/incomeStatement`
- GET `/company/<ticker>/cashFlowStatement`
