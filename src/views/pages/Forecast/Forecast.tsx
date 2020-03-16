import { Balance } from 'models/Balance';
import { RecurringTransactionConfig } from 'models/RecurringTransaction';
import { Tag } from 'models/Tag';
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
import { getAllEstimatesSelector } from 'state/ducks/estimates';
import { createTag, getTagsSelector } from 'state/ducks/tags';
import { getAllTransactionsSelector } from 'state/ducks/transactions';
import { getWalletsSelector } from 'state/ducks/wallets';
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
  const tags = useSelector(getTagsSelector);
  const wallets = useSelector(getWalletsSelector);
  const createContractDispatcher = (rt: RecurringTransactionConfig) => {
    rt.id = getRandomString();
    dispatch(createContract(rt));
  };
  const removeContractDispatcher = (id: string) => {
    dispatch(removeContract(id));
  };
  const createTagDispatcher = (tag: Tag) => {
    dispatch(createTag(tag));
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
              tags={tags}
              wallets={wallets}
              createTag={createTagDispatcher}
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
              tags={tags}
              wallets={wallets}
              createTag={createTagDispatcher}
            />
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

const ForecastContainer = connect((state: any) => {
  const allTransactions = getAllTransactionsSelector(state);
  const estimatesAllTransactions = getAllEstimatesSelector(state);
  const wallets = getWalletsSelector(state);

  const balance: Balance[] =
    calculateTransactionsEstimatesBalance(allTransactions, estimatesAllTransactions, wallets) || [];

  return {
    balance,
    wallets,
    allTransactions,
    allEstimates: estimatesAllTransactions,
  };
})(Forecast);

export default () => <ForecastContainer />;
