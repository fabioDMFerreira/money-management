import Transaction from "./Transaction.class";
import Balance from "./Balance.interface";

export default (transactions: Transaction[]): Balance => {
  return transactions.reduce((balance: Balance, transaction: Transaction) => {
    if (transaction.value > 0) {
      balance.income += transaction.value;
    } else {
      balance.outcome -= transaction.value;
    }

    balance.balance += transaction.value;

    return balance;
  }, { income: 0, outcome: 0, balance: 0 })
}
