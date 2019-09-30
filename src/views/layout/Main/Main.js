import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Home from 'scenes/Home';
// import Authentication from 'scenes/Authentication';
import NotFound from 'views/pages/NotFound';
import BalanceContainer from 'views/pages/FinancialForecast/Timeline';
import Tags from 'views/pages/FinancialForecast/Tags';
import Settings from 'views/pages/FinancialForecast/Settings';
import Estimates from 'views/pages/FinancialForecast/Estimates';
import Transactions from 'views/pages/FinancialForecast/components/Transactions';
import TransactionsPage from 'views/pages/FinancialForecast/TransactionsPage';
import TagsPage from 'views/pages/FinancialForecast/Tags/TagPage';
import Dashboard from 'views/pages/Dashboard';
import FinancialForecastHOC from 'views/pages/FinancialForecast';

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
					<Route
						path="/estimates"
						component={FinancialForecastHOC(() => (
							<Estimates
								TransactionsComponent={Transactions}
							/>))}
					/>
					<Route path="/timeline" component={FinancialForecastHOC(BalanceContainer)} />
					<Route path="/tags" exact component={FinancialForecastHOC(Tags)} />
					<Route path="/tags/:id" component={FinancialForecastHOC(TagsPage)} />
					<Route path="/settings" component={Settings} />
					<Route path="/not-found" component={NotFound} />
				</React.Fragment>
			}
			{/* <Ro	ute path="/login" component={Authentication} /> */}
		</Switch>
	</div>
);

export default Main;
