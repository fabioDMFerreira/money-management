import faker from 'faker';
import Transaction from 'models/Transaction';

const setCreditOrDebit = (value: number, creditProb: number) => {
  const space = faker.random.number(100);

  if (space < creditProb) {
    return value;
  }

  return value * -1;
}

const randomTransaction = () => {
  const description = faker.finance.iban();
  const date = faker.date.between(new Date(2019, 0, 1), new Date(2019, 12, 31));
  let value;

  const space = faker.random.number(100);

  if (space < 75) {
    value = faker.random.number(100) + 1;
    value = setCreditOrDebit(value, 5);
  } else if (space < 90) {
    value = faker.random.number(400) + 100;
    value = setCreditOrDebit(value, 10);
  } else if (space < 98) {
    value = faker.random.number(1500) + 500;
    value = setCreditOrDebit(value, 80);
  } else {
    value = faker.random.number(8000) + 2000;
    value = setCreditOrDebit(value, 50);
  }

  return new Transaction(description, value, date);
}


describe('test', () => {
  it('test', () => {

    const transactions = [];

    for (let i = 0; i < 100; i++) {
      transactions.push(randomTransaction());
    }

    const creditTxCounter = transactions.reduce((counter, tx) => {

      if (tx.value > 0) {
        counter++;
      }

      return counter;
    }, 0)

    const yearTxCounter = transactions.reduce((counter, tx) => {

      if (tx.startDate > new Date(2019, 6, 30)) {
        counter++;
      }

      return counter;
    }, 0)

    expect(creditTxCounter).toBeLessThan(50);
    expect(creditTxCounter).toBeGreaterThan(8);
    expect(yearTxCounter).toBeGreaterThan(30);
    expect(yearTxCounter).toBeLessThan(70);
  });
})
