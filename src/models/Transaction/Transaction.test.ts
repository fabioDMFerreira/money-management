import Transaction from './Transaction';

describe('Transaction class', () => {
  it('should return a object with default properties', () => {
    const transaction = new Transaction('water bill', 1000, new Date('2018-01-01'));

    expect(transaction.startDate).toEqual(new Date('2018-01-01'));
    expect(transaction.endDate).toEqual(new Date('2018-01-01'));
    expect(transaction.value).toEqual(1000);
    expect(transaction.totalValue).toEqual(1000);
    expect(transaction.description).toEqual('water bill');
    expect(transaction.particles).toEqual(1);
  });

  it('set particles should change value and endDate properties', () => {
    const transaction = new Transaction('water bill', 1000, new Date('2018-01-01'));

    transaction.particles = 3;

    expect(transaction.particles).toEqual(3);
    expect(transaction.endDate).toEqual(new Date('2018-03-01'));
    expect(transaction.value).toEqual(1000 / 3);


    transaction.particles = 1;

    expect(transaction.particles).toEqual(1);
    expect(transaction.endDate).toEqual(new Date('2018-01-01'));
    expect(transaction.value).toEqual(1000);
  });

  // it('set endDate should change value and particles properties', () => {
  //   const transaction = new Transaction('water bill', 1000, new Date('2018-01-01'));

  //   transaction.endDate = new Date('2018-09-30');

  //   expect(transaction.particles).toEqual(9);
  //   expect(transaction.endDate).toEqual(new Date('2018-09-30'));
  //   expect(transaction.value).toEqual(1000 / 9);


  //   transaction.particles = 1;

  //   expect(transaction.particles).toEqual(1);
  //   expect(transaction.value).toEqual(1000);
  //   expect(transaction.endDate).toEqual(new Date('2018-01-30'));

  //   transaction.endDate = new Date('2018-02-28');

  //   expect(transaction.startDate).toEqual(new Date('2018-01-01'));
  //   expect(transaction.endDate).toEqual(new Date('2018-02-28'));
  //   expect(transaction.particles).toEqual(2);
  //   expect(transaction.value).toEqual(1000 / 2);


  //   const salary = new Transaction('salary', 1700 * 12, undefined);

  //   salary.startDate = new Date('2018-1-1');
  //   salary.particles = 12;

  //   expect(salary.startDate).toEqual(new Date('2018-1-1'));
  //   expect(salary.endDate).toEqual(new Date('2018-12-1'));
  // });

  it('set endDate should change value of start date if start date is greater than end date', () => {
    const transaction = new Transaction('water bill', 1000, new Date('2018-01-01'));

    transaction.endDate = new Date('2017-01-01');

    expect(transaction.startDate).toEqual(new Date('2017-01-01'));
    expect(transaction.endDate).toEqual(new Date('2017-01-01'));
    expect(transaction.particles).toEqual(1);
  });

  // it('set value should change totalValue', () => {
  //   const transaction = new Transaction('water bill', 1000, new Date('2018-01-01'));

  //   transaction.value = 200;

  //   expect(transaction.value).toEqual(200);
  //   expect(transaction.totalValue).toEqual(200);

  //   transaction.particles = 3;
  //   transaction.value = 100;

  //   expect(transaction.totalValue).toEqual(300);

  //   transaction.value = 50;

  //   expect(transaction.totalValue).toEqual(150);
  // });

  // it('set totalValue should change value', () => {
  //   const transaction = new Transaction('water bill', 1000, new Date('2018-01-01'));

  //   transaction.totalValue = 500;

  //   expect(transaction.value).toEqual(500);
  //   expect(transaction.totalValue).toEqual(500);

  //   transaction.particles = 3;

  //   expect(transaction.totalValue).toEqual(500);
  //   expect(transaction.value).toEqual(500 / 3);

  //   transaction.totalValue = 1000;

  //   expect(transaction.value).toEqual(1000 / 3);
  // });

  it('set startDate should change value and particles properties', () => {
    const transaction = new Transaction('water bill', 1000, new Date('2018-01-01'));

    transaction.startDate = new Date('2018-09-30');

    expect(transaction.particles).toEqual(1);
    expect(transaction.startDate).toEqual(new Date('2018-09-30'));
    expect(transaction.value).toEqual(1000);


    transaction.startDate = new Date('2018-02-28');

    expect(transaction.startDate).toEqual(new Date('2018-02-28'));
    expect(transaction.endDate).toEqual(new Date('2018-02-28'));
    expect(transaction.particles).toEqual(1);
    expect(transaction.value).toEqual(1000);
  });

  it('set start date should change value of end date if end date is lower than start date', () => {
    const transaction = new Transaction('water bill', 1000, new Date('2018-01-01'));

    transaction.startDate = new Date('2018-09-30');

    expect(transaction.particles).toEqual(1);
    expect(transaction.startDate).toEqual(new Date('2018-09-30'));
    expect(transaction.value).toEqual(1000);
  });

  // it('set end date should reset interval value', () => {
  //   const transaction = new Transaction('water bill', 1000, new Date('2018-01-01'));

  //   expect(transaction.interval).toEqual(1);

  //   transaction.interval = 10;

  //   expect(transaction.interval).toEqual(10);

  //   transaction.endDate = new Date('2018-01-01');

  //   expect(transaction.interval).toBe(1);
  // });

  it('set interval should reset end date value to start date', () => {
    const transaction = new Transaction('water bill', 1000, new Date('2018-01-01'));

    expect(transaction.endDate).toEqual(new Date('2018-01-01'));

    transaction.endDate = new Date('2018-03-01');

    expect(transaction.endDate).toEqual(new Date('2018-03-01'));

    transaction.interval = 5;

    expect(transaction.endDate).toEqual(new Date('2018-01-01'));
  });
});
