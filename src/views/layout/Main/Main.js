import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Home from 'scenes/Home';
// import Authentication from 'scenes/Authentication';
import NotFound from 'views/pages/NotFound';

import './Main.css';
import BalanceContainer from 'views/pages/FinancialForecast/Timeline';
import Labels from 'views/pages/FinancialForecast/Labels';
import Settings from 'views/pages/FinancialForecast/Settings';
import Estimates from 'views/pages/FinancialForecast/Estimates';
import Transactions from 'views/pages/FinancialForecast/components/Transactions';
import TransactionsPage from 'views/pages/FinancialForecast/TransactionsPage';

const Main = ({ isLoggedIn }) => (
	<div id="main">
		<Switch>
			{
				// isLoggedIn &&
				<React.Fragment>
					{/* <Route path="" exact component={Home} /> */}
					{/* <Route path="/" component={FinancialForecast} /> */}
					<Route exact path="/" component={() => <TransactionsPage
						TransactionsComponent={Transactions}
					/>}/>
					<Route path="/estimates" component={() => <Estimates
						TransactionsComponent={Transactions}
					/>}/>
					<Route path="/timeline" component={BalanceContainer} />
					<Route path="/tags" component={Labels} />
					<Route path="/settings" component={Settings} />
					<Route path="/not-found" component={NotFound} />
				</React.Fragment>
			}
			{/* <Ro	ute path="/login" component={Authentication} /> */}
		</Switch>
	</div>
);

export default Main;
