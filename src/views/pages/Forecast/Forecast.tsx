import { Balance } from 'models/Balance';
import { RecurringTransactionConfig } from 'models/RecurringTransaction';
import { TransactionConfig } from 'models/Transaction/TransactionConfig';
import { Wallet } from 'models/Wallet';
import React, { Fragment, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { createBudget, removeBudget } from 'state/ducks/budgets/budgetsActions';
import { getBudgets } from 'state/ducks/budgets/budgetsSelectors';
import { createContract, removeContract } from 'state/ducks/contracts/contractsActions';
import { getContracts } from 'state/ducks/contracts/contractsSelectors';
import calculateTransactionsEstimatesBalance from 'usecases/calculateBalance/calculateTransactionsEstimatesBalance';
import getRandomString from 'utils/getRandomString';

import Estimates from '../../hocs/EstimatesContainerHoc';
import Transactions from '../Transactions';
import Timeline from '../Transactions/Timeline/Timeline';
import Contracts from './components/Contracts';

interface Props {
  wallets: [Wallet];
  balance: Balance[];
  allTransactions: [TransactionConfig];
  allEstimates: [TransactionConfig];
}

const EstimatesComponent = Estimates(Transactions);


const Forecast = ({
  balance, allTransactions,
}: Props) => {
  const dispatch = useDispatch();

  const [tableView, setTableView] = useState('estimates');

  const contracts = useSelector(getContracts);
  const createContractDispatcher = (rt: RecurringTransactionConfig) => {
    rt.id = getRandomString();
    dispatch(createContract(rt));
  };
  const removeContractDispatcher = (id: string) => {
    dispatch(removeContract(id));
  };

  const budgets = useSelector(getBudgets);
  const createBudgetDispatcher = (rt: RecurringTransactionConfig) => {
    rt.id = getRandomString();
    dispatch(createBudget(rt));
  };
  const removeBudgetDispatcher = (id: string) => {
    dispatch(removeBudget(id));
  };

  return (
    <Fragment>
      <h2>Forecast</h2>
      <hr />
      <Timeline
        balance={balance}
        transactions={allTransactions}
      />
      <Nav tabs className="mb-2 mt-4">
        <NavItem>
          <NavLink
            className={tableView === 'estimates' ? 'active' : ''}
            onClick={() => { setTableView('estimates'); }}
          >
            Estimates
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={tableView === 'contracts' ? 'active' : ''}
            onClick={() => { setTableView('contracts'); }}
          >
            Contracts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={tableView === 'budgets' ? 'active' : ''}
            onClick={() => { setTableView('budgets'); }}
          >
            Budgets
          </NavLink>
        </NavItem>
      </Nav>
      {
        tableView === 'estimates' &&
        <EstimatesComponent />
      }
      {
        tableView === 'contracts' &&
        <Fragment>
          <div className="mt-1">
            <Contracts
              createContract={createContractDispatcher}
              contracts={contracts}
              removeContract={removeContractDispatcher}
            />
          </div>
        </Fragment>
      }
      {
        tableView === 'budgets' &&
        <Fragment>
          <div className="mt-1">
            <Contracts
              createContract={createBudgetDispatcher}
              contracts={budgets}
              removeContract={removeBudgetDispatcher}
            />
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default connect((state: any) => {
  const { financialForecast: { allTransactions, estimatesAllTransactions }, wallets: { wallets } } = state;

  const balance: Balance[] =
    calculateTransactionsEstimatesBalance(allTransactions.toJS(), estimatesAllTransactions.toJS(), wallets.toJS()) || [];

  return {
    balance,
    wallets: wallets.toJS() || [],
    allTransactions: allTransactions.toJS() || [],
    allEstimates: estimatesAllTransactions.toJS() || [],
  };
})(Forecast);
