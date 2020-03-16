import { RecurringTransactionConfig } from 'models/RecurringTransaction';
import { Tag } from 'models/Tag';
import { Wallet } from 'models/Wallet';
import React, { Fragment } from 'react';
import AddRecurringTransaction from 'views/components/AddRecurringTransaction';

import ContractsTable from './ContractsTable';

interface Props {
  contracts: RecurringTransactionConfig[];
  createContract: (rt: RecurringTransactionConfig) => void;
  removeContract: (id: string) => void;
  tags: Tag[];
  wallets: Wallet[];
  createTag: any;
}

export default ({
  contracts, createContract, removeContract, tags, wallets, createTag,
}: Props) => (
  <Fragment>
    <div className="mb-1">
      <AddRecurringTransaction
        tags={tags}
        wallets={wallets}
        createTag={createTag}
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
