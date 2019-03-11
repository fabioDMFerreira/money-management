import Transaction from "./Transaction.class";
import calculateBalance from "./calculateBalance";
import Balance from "./Balance.interface";

describe('calculate balance', () => {
  it('should return balance of transactions passed', () => {
    const transactions: Transaction[] = [
      new Transaction('a', 1000, undefined),
      new Transaction('b', -400, undefined),
      new Transaction('c', 20, undefined),
      new Transaction('d', 10000, undefined),
      new Transaction('e', -5000, undefined)
    ];

    const actual: Balance = calculateBalance(transactions);
    const expected: Balance = {
      income: 11020,
      outcome: 5400,
      balance: 11020 - 5400,
    }

    expect(actual).toEqual(expected);
  });
})
