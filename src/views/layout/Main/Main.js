import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Home from 'scenes/Home';
// import Authentication from 'scenes/Authentication';
import NotFound from 'views/pages/NotFound';
import BalanceContainer from 'views/pages/FinancialForecast/Timeline';
import Tags from 'views/pages/Tags';
import Settings from 'views/pages/Tags/Settings';
import Transactions from 'views/pages/FinancialForecast/components/Transactions';
import TransactionsPage from 'views/pages/FinancialForecast/TransactionsPage';
import TagsPage from 'views/pages/Tags/TagPage';
import Dashboard from 'views/pages/Dashboard';
import FinancialForecastHOC from 'views/pages/FinancialForecast';
import Wallet from 'views/pages/Wallet';
import Wallets from 'views/pages/Wallets';
import Forecast from 'views/pages/Forecast';

import './Main.css';

const Main = () => (
	<div id="main">
		<Switch>
			{
				// isLoggedIn &&
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
					<Route path="/transactions/tags" component={FinancialForecastHOC(Tags)} />
					<Route path="/timeline" component={FinancialForecastHOC(BalanceContainer)} />
					<Route path="/tags" exact component={Tags} />
					<Route path="/tags/settings/list" exact component={Settings} />
					<Route path="/tags/:id" exact component={TagsPage} />
					<Route path="/wallets" exact component={Wallets} />
					<Route path="/wallets/:id" component={Wallet} />
					<Route path="/forecast" component={Forecast} />
					<Route path="/not-found" component={NotFound} />
				</React.Fragment>
			}
			{/* <Ro	ute path="/login" component={Authentication} /> */}
		</Switch>
	</div>
);

export default Main;
