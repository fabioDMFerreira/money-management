import Forecast from "./Forecast.class";
import Transaction from "./Transaction.class";
import calculateBalance from "./calculateForecastBalance";

describe('calculateForecastBalance', () => {
  it('should return balance', () => {
    const forecast = new Forecast(new Date('2018-01-01'), new Date('2018-3-30'), 1000);
    const transactions = [
      new Transaction('water bill', -50, new Date('2018-02-15')),
    ]

    expect(calculateBalance(forecast, transactions)).toEqual([
      {
        date: new Date('2018-01-01'),
        income: 0,
        outcome: 0,
        balance: 0,
        actualValue: 1000
      },
      {
        date: new Date('2018-02-01'),
        income: 0,
        outcome: 50,
        balance: -50,
        actualValue: 950
      },
      {
        date: new Date('2018-03-01'),
        income: 0,
        outcome: 0,
        balance: 0,
        actualValue: 950
      }
    ])
  });

});
