import { RecurringTransactionConfig } from 'models/RecurringTransaction';
import { Wallet } from 'models/Wallet';
import { useEffect, useState } from 'react';
import { sumMonths } from 'utils/dateUtils';

export default (contracts: RecurringTransactionConfig[], budgets: RecurringTransactionConfig[], wallets: Wallet[]) => {
  const [timeToLiveDate, setTimeToLiveDate] = useState<Date>();
  const [totalBalance, setTotalBalance] = useState<number>();
  const [monthlySpends, setMonthlySpends] = useState<number>();
  const [timeToLive, setTimeToLive] = useState<string>();

  useEffect(() => {
    if (!contracts || !budgets || !wallets) {
      return;
    }

    let final = wallets.reduce((total: number, wallet: Wallet) => total + wallet.balance, 0);

    setTotalBalance(final);

    contracts.forEach((contract) => {
      if (contract.totalValue && contract.totalValue < 0) {
        final += contract.totalValue;
      }
    });

    const monthlyValue = budgets.reduce((total, budget) => {
      let value = 0;
      if (budget.valuePerTime && budget.valuePerTime < 0) {
        value = -1 * budget.valuePerTime;
      }

      return total + value;
    }, 0);

    setMonthlySpends(monthlyValue);

    let months = 0;

    while (final > 0) {
      final -= monthlyValue;
      if (final > 0) {
        months++;
      }
    }

    const finalDate = sumMonths(new Date(), months);

    setTimeToLiveDate(finalDate);
    setTimeToLive(`${(months / 12).toFixed(2)} years (${months} months)`);
  }, [contracts, budgets, wallets]);

  return {
    timeToLiveDate,
    totalBalance,
    monthlySpends,
    timeToLive,
  };
};

