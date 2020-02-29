import './Main.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'views/pages/Dashboard';
import Forecast from 'views/pages/Forecast';
import NotFound from 'views/pages/NotFound';
import Rules from 'views/pages/Rules';
import Tags from 'views/pages/Tags';
import Settings from 'views/pages/Tags/Settings';
import TagsPage from 'views/pages/Tags/TagPage';
import Transactions from 'views/pages/Transactions';
import FinancialForecastHOC from 'views/pages/Transactions/FinancialForecastHOC';
import TransactionsTags from 'views/pages/Transactions/Tags';
import TagTransactions from 'views/pages/Transactions/TagTransactions';
import BalanceContainer from 'views/pages/Transactions/Timeline';
import TransactionsPage from 'views/pages/Transactions/TransactionsPage';
import Wallet from 'views/pages/Wallet';
import Wallets from 'views/pages/Wallets';

const Main = () => (
  <div id="main">
    <Switch>
      <React.Fragment>
        <Route path="/" exact component={Dashboard} />
        {/* <Route path="/" component={FinancialForecast} /> */}
        <Route
          exact
          path="/transactions"
          component={FinancialForecastHOC(() => (
            <TransactionsPage
              TransactionsComponent={Transactions}
            />
          ))}
        />
        <Route path="/transactions/tags" component={FinancialForecastHOC(TransactionsTags)} />
        <Route path="/transactions/tag-transactions" component={FinancialForecastHOC(TagTransactions)} />
        <Route path="/timeline" component={FinancialForecastHOC(BalanceContainer)} />
        <Route path="/tags" exact component={Tags} />
        <Route path="/tags/settings/list" exact component={Settings} />
        <Route path="/tags/:id" exact component={TagsPage} />
        <Route path="/wallets" exact component={Wallets} />
        <Route path="/wallets/:id" component={Wallet} />
        <Route path="/forecast" component={Forecast} />
        <Route path="/rules" component={Rules} />
        <Route path="/not-found" component={NotFound} />
      </React.Fragment>
      {/* <Route path="/login" component={Authentication} /> */}
    </Switch>
  </div>
);

export default Main;
