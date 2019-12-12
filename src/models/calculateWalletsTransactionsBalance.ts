import Transaction from 'models/Transaction';
import Forecast from 'models/Forecast';
import calculateForecastBalance from 'models/calculateForecastBalance';
import TransactionConfig from 'models/Transaction/TransactionConfig';
import calculateReverseBalance from 'models/Balance/calculateReverseBalance';
import { firstMonthDay, sumMonths } from 'models/utils';
import { Wallet } from 'models/Wallet';
import Balance from 'models/Balance';


export default (transactionsData: TransactionConfig[], wallets: Wallet[], initialDate?: Date, finalDate?: Date): Balance[] => {
	let minDate = initialDate;
	let maxDate = finalDate;

	const transactions: Transaction[] =
    transactionsData
    	.map(transaction => Transaction.buildFromTransactionData(transaction));

	if (!minDate && !maxDate) {
		const startDates = transactions.map((transaction: Transaction) => transaction.startDate.getTime());
		const endDates = transactions.map((transaction: Transaction) => (transaction.endDate ? transaction.endDate.getTime() : transaction.startDate.getTime()));

		minDate = new Date(Math.min.apply(null, startDates));
		maxDate = new Date(Math.max.apply(null, endDates));
	}

	const today = new Date();
	const todayUtcDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
	const thisMonthFirstDay = firstMonthDay(todayUtcDate);


	const endValue = wallets.reduce((total, wallet: Wallet) => {
		total += wallet.balance;
		return total;
	}, 0);

	const forecastBeforeToday = minDate && new Forecast(sumMonths(minDate, -1), thisMonthFirstDay, { endValue });
	const forecastAfterToday = maxDate && maxDate > thisMonthFirstDay && new Forecast(thisMonthFirstDay, maxDate, { initialValue: endValue });

	let balance: Balance[] = [];

	if (forecastBeforeToday) {
		balance = balance.concat(calculateReverseBalance(forecastBeforeToday, transactions));
	}

	if (forecastAfterToday) {
		balance = balance.concat(calculateForecastBalance(forecastAfterToday, transactions));
	}

	return balance;
};
