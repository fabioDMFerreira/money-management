import { RecurringTransactionConfig } from 'models/RecurringTransaction';
import React, { Fragment } from 'react';
import AddRecurringTransaction from 'views/containers/AddRecurringTransaction';

import ContractsTable from './ContractsTable';

interface Props {
  contracts: RecurringTransactionConfig[];
  createContract: (rt: RecurringTransactionConfig) => void;
  removeContract: (id: string) => void;
}

export default ({ contracts, createContract, removeContract }: Props) => (
  <Fragment>
    <div className="mb-1">
      <AddRecurringTransaction
        create={createContract}
        recurringTransactionType="contract"
      />
    </div>
    <ContractsTable
      contracts={contracts}
      removeContract={removeContract}
    />
  </Fragment>
);
