import { RecurringTransactionConfig } from 'models/RecurringTransaction';
import { Wallet } from 'models/Wallet';
import React from 'react';

import useSurvivalReport from './useSurvivalReport';

interface Props {
  contracts: RecurringTransactionConfig[],
  budgets: RecurringTransactionConfig[],
  wallets: Wallet[]
}

export default ({ contracts, budgets, wallets }: Props) => {
  const {
    timeToLiveDate,
    totalBalance,
    monthlySpends,
    timeToLive,
  } = useSurvivalReport(contracts, budgets, wallets);

  if (!timeToLiveDate || !totalBalance || !monthlySpends || !timeToLive) {
    return <span />;
  }

  return (
    <div>
      <p>
        <big>
          <b>Total Balance:</b> {totalBalance}
        </big>
      </p>
      <p>
        <big>
          <b>Monthly spends average:</b> {monthlySpends}
        </big>
      </p>
      <p>
        <big>
          <b>Time with positive balance (worst case):</b> {timeToLive}
        </big>
      </p>
      <p>
        <big>
          <b>Stable until:</b> {timeToLiveDate.toDateString()}
        </big>
      </p>
    </div>
  );
};

