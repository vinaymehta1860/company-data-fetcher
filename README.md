# company-data-fetcher

This is a backend service which gathers company's financial data from [Financial Modeling Prep](https://financialmodelingprep.com/) website.
This is basically used as a micro-service to fetch company's balance sheets, income and cash flow statements if not already present in database.

## TLDR;

I've a free account registered with this website and I've sometimes noticed that the `earning_calendar` endpoint is not accurate in it's response.
Upon using it I noticed that it missed some companies earnings date and on some occasions had wrong earnings date for some companies.

### Endpoints supported:

- GET `/company/<ticker>/balanceSheet`
- GET `/company/<ticker>/incomeStatement`
- GET `/company/<ticker>/cashFlowStatement`
- GET `/earningscalendar`
